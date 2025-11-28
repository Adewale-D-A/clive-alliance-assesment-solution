export type CreateUserT = {
  first_name: string;
  last_name: string;
  password: string;
  email: string;
};
export type CreateTransactionT = {
  amount: number;
  type: string;
  description: string;
};
export type UpdateUserT = Partial<Omit<CreateUserT, "password" | "email">>;
export type UpdateTransactionT = Partial<
  Omit<CreateTransactionT, "amount" | "type">
>;
