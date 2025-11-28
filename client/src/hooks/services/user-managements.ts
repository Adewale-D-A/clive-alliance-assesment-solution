import { z } from "zod";
import { useForm } from "react-hook-form";
import { AddEditUserSchema } from "../../config/schema/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "../../config/services/axios-context";
import { useAppDispatch, useAppSelector } from "../../stores/store-hooks";
import { closeFormModal } from "../../stores/features/services/form-modal";
import { useState } from "react";
import { openInfobar } from "../../stores/features/app-native-features/info-modal";
import {
  addUsersToList,
  removeUsersInList,
  replaceUsersInList,
} from "../../stores/features/services/API/users/users";
import type { UserT } from "../../types/api/service.types";

type AddEditUserSchemaType = z.infer<typeof AddEditUserSchema>;

/**
 * POST/DELETE/UPDATE hook for user management module.
 *
 * @returns returns user management module service functions
 */

export default function useUserManagementService() {
  const axios = useAxios();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth.value);

  const userForm = useForm<z.infer<typeof AddEditUserSchema>>({
    resolver: zodResolver(AddEditUserSchema),
    defaultValues: {
      email: "",
      gender: "",
      first_name: "",
      last_name: "",
      username: "",
      password: "",
      phone_number: "",
      dob: "",
    },
  });

  const addEditUser = async (data: AddEditUserSchemaType, id?: string) => {
    try {
      let userObject: UserT | null = null;
      const { dob, gender, username } = data;
      const extraData = { ...data };

      const clonedRecord: Partial<typeof extraData> = extraData;
      if (id) {
        delete clonedRecord.password;
        delete clonedRecord.email;
        const response = await axios.patch(
          `/users/all-users/${id}/`,
          clonedRecord
        );
        const result = response?.data;
        userObject = result;
        dispatch(replaceUsersInList({ ...result, id }));
      } else {
        if (!dob) delete clonedRecord.dob;
        if (!gender) delete clonedRecord.gender;
        if (!username) delete clonedRecord.username;
        const response = await axios.post("/users/create-user/", clonedRecord);
        const user = response?.data?.user;
        userObject = user;
        dispatch(addUsersToList({ ...user }));
      }
      dispatch(
        openInfobar({
          render: "SuccessPrompt",
          message: "User successfully" + " " + `${id ? "updated" : "created"}`,
        })
      );
      dispatch(closeFormModal());
      return userObject;
    } catch (error) {}
  };

  const deleteUser = async (id: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/users/all-users/${id}/`);
      dispatch(removeUsersInList({ id }));
      dispatch(
        openInfobar({
          render: "SuccessPrompt",
          message: "User successfully deleted",
        })
      );
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users: {
      form: userForm,
      submit: addEditUser,
      delete: deleteUser,
    },
    states: {
      loading: isLoading,
    },
  };
}
