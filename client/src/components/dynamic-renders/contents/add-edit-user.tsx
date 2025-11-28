import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../../../components/_shared/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/_shared/select";
import { Input } from "../../../components/_shared/input";
import { Button } from "../../../components/_shared/button";
import { useAppSelector } from "../../../stores/store-hooks";
import { useEffect } from "react";
import useUserManagementService from "../../../hooks/services/user-managements";
import useGetAUser from "../../../hooks/services/GET/users-management/user";

export default function AddEditUser() {
  const { metadata } = useAppSelector((state) => state.formModal.value);
  const { users } = useUserManagementService();
  const { data } = useGetAUser(metadata?.id);

  // Prepopulate in case of edit action
  useEffect(() => {
    if (metadata.id && data?.id) {
      const {
        email,
        first_name,
        last_name,
        gender,
        phone_number,
        dob,
        username,
      } = data;
      users.form.reset({
        email,
        first_name,
        last_name,
        username,
        gender,
        phone_number,
        dob,
        password: "none",
      });
    }
  }, [metadata?.id, data?.id]);

  return (
    <div className=" w-full max-w-screen-custom space-y-5">
      <p>Fill out the details below to manage user effectively.</p>
      <Form {...users.form}>
        <form
          onSubmit={users.form.handleSubmit((e) =>
            users.submit(e, metadata?.id)
          )}
          className="space-y-4"
        >
          <div className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormField
              control={users.form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium text-gray-600">
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={users.form.control}
              name="last_name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium text-gray-600">
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={users.form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium text-gray-600">
                    User Name
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter user name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={users.form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium text-gray-600">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={metadata?.id}
                      placeholder="Enter email"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={users.form.control}
              name="dob"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium text-gray-600">
                    Date of Birth
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter date of birth"
                      type="date"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={users.form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium text-gray-600">
                    Gender
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[50vh]" position="popper">
                      <SelectGroup>
                        {["Male", "Female"].map((state) => (
                          <SelectItem value={state} key={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={users.form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium text-gray-600">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone number"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!metadata?.id && (
              <>
                <FormField
                  control={users.form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-medium text-gray-600">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <Button type="submit" isLoading={users.form.formState.isSubmitting}>
            {metadata?.id ? "Update" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
