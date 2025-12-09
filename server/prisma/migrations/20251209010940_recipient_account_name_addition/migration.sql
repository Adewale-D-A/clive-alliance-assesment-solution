/*
  Warnings:

  - Added the required column `recipient_account_name` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "account_number" SET DEFAULT floor(random() * 9000000000 + 1000000000);

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "recipient_account_name" TEXT NOT NULL;
