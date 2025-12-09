export type CreateUserT = {
  email: string;
  gender: string;
  first_name: string;
  last_name: string;
  password: string;
  phone_number: string;
  dob: string;
  username?: string | undefined;
};
export type CreateTransactionT = {
  amount: number;
  description: string;
  recipient_account: number;
  transaction_type: string;
};
export type CreateAccountT = {
  user_id: string;
  account_type: string;
  account_name?: string;
  currency?: string;
};
export type UpdateUserT = Partial<Omit<CreateUserT, "password" | "email">>;
export type UpdateAccountT = Partial<Omit<CreateAccountT, "user_id">>;
export type UpdateTransactionT = Partial<
  Omit<CreateTransactionT, "amount" | "type">
>;
