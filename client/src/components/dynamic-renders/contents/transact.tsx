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
import { useMemo } from "react";
import { useAppSelector } from "../../../stores/store-hooks";
import useValidateAccount from "../../../hooks/services/GET/transactions/validate-account";
import Refresh from "../../_shared/button/refresh";

export default function Transact() {
  const { metadata } = useAppSelector((state) => state.formModal.value);
  const { transaction } = useTransactionService();

  const recipient_account_numb = useMemo(
    () => transaction.form.watch().recipient_account,
    [transaction.form.watch().recipient_account]
  );

  const { data, retryFunction, isLoading } = useValidateAccount(
    String(recipient_account_numb)
  );

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
            <div className=" w-full grid grid-cols-1 gap-5 lg:grid-cols-2">
              <FormField
                control={transaction.form.control}
                name="recipient_bank"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-gray-600">
                      Recipient Bank
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
                            type="number"
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
                        placeholder="Enter amount"
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
          <Button
            type="submit"
            className=" w-full"
            isLoading={transaction.form.formState.isSubmitting}
          >
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
