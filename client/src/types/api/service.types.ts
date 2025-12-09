export type UserT = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  dob: string;
  gender: string;
};

export type UserAccount = {
  account_number: number;
  account_name: string;
  bank: { code: string; name: string };
};

export type AuthUserAccount = {
  user: UserT;
  account_number: number;
  account_name: string;
  currency: string;
  account_type: string;
  available_balance: number;
};

export type TransactionT = {
  id: string;
  amount: number;
  description: string;
  recipient_account_number: string;
  recipient_bank_code: string;
  recipient_account_name: string;
  transaction_type: string;
  created_at: string;
  updated_at: number;
  created_by: UserT;
};
