import { z } from "zod";
import { useForm } from "react-hook-form";
import { NewTransactionSchema } from "../../config/schema/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import useAxios from "../../config/services/axios-context";
import { useAppDispatch, useAppSelector } from "../../stores/store-hooks";
import { closeFormModal } from "../../stores/features/services/form-modal";
import { useState } from "react";
import { openInfobar } from "../../stores/features/app-native-features/info-modal";
import { addTransactionToList } from "../../stores/features/services/API/transactions/transaction";

type NewTransactionSchemaType = z.infer<typeof NewTransactionSchema>;

/**
 * POST/DELETE/UPDATE hook for transaction module.
 *
 * @returns returns transaction module service functions
 */

export default function useTransactionService() {
  const axios = useAxios();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAppSelector((state) => state.auth.value);

  const transactionForm = useForm<z.infer<typeof NewTransactionSchema>>({
    resolver: zodResolver(NewTransactionSchema),
    defaultValues: {
      transaction_type: "",
      amount: 0,
      description: "",
      recipient_account: 0,
    },
  });

  const newTransaction = async (data: NewTransactionSchemaType) => {
    try {
      const response = await axios.post("/transactions", data);
      const { message, data: responseData } = response?.data;
      dispatch(addTransactionToList({ ...responseData }));
      dispatch(
        openInfobar({
          render: "SuccessPrompt",
          message: message ?? "Transaction was successful",
        })
      );
      dispatch(closeFormModal());
    } catch (error) {}
  };

  return {
    transaction: {
      form: transactionForm,
      submit: newTransaction,
    },
    states: {
      loading: isLoading,
    },
  };
}
