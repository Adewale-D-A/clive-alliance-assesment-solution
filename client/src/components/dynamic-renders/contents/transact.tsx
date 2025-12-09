import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
} from "../../_shared/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../_shared/select";
import { Input } from "../../_shared/input";
import { Button } from "../../_shared/button";
import useTransactionService from "../../../hooks/services/transactions";
import { useEffect, useMemo, useState } from "react";
import { useAppSelector } from "../../../stores/store-hooks";
import useValidateAccount from "../../../hooks/services/GET/transactions/validate-account";
import Refresh from "../../_shared/button/refresh";
import useGetMyAccount from "../../../hooks/services/GET/accounts/account";
import { MailWarning } from "lucide-react";

export default function Transact() {
  const { metadata } = useAppSelector((state) => state.formModal.value);
  const { transaction } = useTransactionService();
  const { data: myAccount } = useGetMyAccount();

  const [inSufficientBal, setInsufficientBal] = useState(false);

  const transaction_type = useMemo(
    () => transaction.form.watch().transaction_type,
    [transaction.form.watch().transaction_type]
  );

  const amount = useMemo(
    () => transaction.form.watch().amount,
    [transaction.form.watch().amount]
  );

  const recipient_account_numb = useMemo(
    () => transaction.form.watch().recipient_account,
    [transaction.form.watch().recipient_account]
  );

  const recipient_bank_code = useMemo(
    () => transaction.form.watch().recipient_bank_code,
    [transaction.form.watch().recipient_bank_code]
  );
  const { data, retryFunction, isLoading } = useValidateAccount(
    String(recipient_account_numb),
    recipient_bank_code
  );

  useEffect(() => {
    if (metadata?.type) {
      transaction.form.setValue("transaction_type", metadata?.type);
    }
  }, [metadata?.type]);

  useEffect(() => {
    if (transaction_type === "DEPOSIT") {
      setInsufficientBal(false);
    } else {
      setInsufficientBal(
        Boolean(Number(amount) >= Number(myAccount?.available_balance))
      );
    }
  }, [myAccount, amount, transaction_type]);

  useEffect(() => {
    if (!(transaction_type === "TRANSFER")) {
      transaction.form.setValue("recipient_bank_code", "1001");
      transaction.form.setValue(
        "recipient_account",
        Number(myAccount?.account_number)
      );
    } else {
      // Clear data on transaction type field change to allow new input
      transaction.form.setValue("recipient_bank_code", "");
      transaction.form.setValue("recipient_account", 0);
    }
  }, [transaction_type, myAccount]);

  return (
    <div className=" w-full space-y-5">
      <p className=" text-green-500 px-5 p-3 rounded-lg bg-green-600/5">
        Fill out the details below make your transaction experience seemless.
      </p>
      <Form {...transaction.form}>
        <form
          onSubmit={transaction.form.handleSubmit(transaction.submit)}
          className="space-y-8"
        >
          <div className=" grid grid-cols-1 gap-4">
            <FormField
              control={transaction.form.control}
              name="transaction_type"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="font-medium text-gray-600">
                    Transaction Type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={metadata?.type ? metadata?.type : field.value}
                    disabled={Boolean(metadata?.type)}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select transaction type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[50vh]" position="popper">
                      <SelectGroup>
                        {[
                          { label: "Deposit", value: "DEPOSIT" },
                          { label: "Withdrawal", value: "WITHDRAWAL" },
                          { label: "Transfer", value: "TRANSFER" },
                        ].map((state) => (
                          <SelectItem value={state.value} key={state.label}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {transaction_type === "TRANSFER" && (
              <div className=" w-full grid grid-cols-1 gap-5 lg:grid-cols-2">
                <FormField
                  control={transaction.form.control}
                  name="recipient_bank_code"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="font-medium text-gray-600">
                        Recipient Bank
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select transaction type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          className="max-h-[50vh]"
                          position="popper"
                        >
                          <SelectGroup>
                            {[
                              { code: "1001", name: "Bank A" },
                              { code: "1002", name: "Bank B" },
                              { code: "1003", name: "Bank C" },
                            ].map((state) => (
                              <SelectItem value={state.code} key={state.code}>
                                {state.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className=" w-full">
                  <div className="flex w-full items-center gap-2">
                    <FormField
                      control={transaction.form.control}
                      name="recipient_account"
                      render={({ field }) => (
                        <FormItem className="space-y-2 w-full">
                          <FormLabel className="font-medium text-gray-600">
                            Receipient's Account Number
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter recipient's account number"
                              type="text"
                              max={10}
                              maxLength={10}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Refresh retry={retryFunction} isLoading={isLoading} />
                  </div>
                  {data?.account_name && (
                    <p className=" text-primary bg-primary/5 px-5 p-2 rounded-lg capitalize">
                      {data.account_name}
                    </p>
                  )}
                </div>
              </div>
            )}
            <div className=" w-full grid grid-cols-1 gap-5 lg:grid-cols-2">
              <FormField
                control={transaction.form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-gray-600">
                      Amount
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter amount (USD)"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={transaction.form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-gray-600">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          {inSufficientBal && (
            <p className=" w-full text-center text-destructive bg-destructive/5 p-3 px-4 rounded-lg  flex items-center gap-2 flex-col lg:flex-row">
              <MailWarning />
              You do not have enough credit to perform this transaction, please
              deposit before proceeding
            </p>
          )}
          <Button
            type="submit"
            className=" w-full"
            disabled={inSufficientBal}
            isLoading={transaction.form.formState.isSubmitting}
            variant={inSufficientBal ? "destructive" : "default"}
          >
            {inSufficientBal ? "Insufficient Balance" : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
