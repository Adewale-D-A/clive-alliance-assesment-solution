-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "account_number" SET DEFAULT floor(random() * 9000000000 + 1000000000),
ALTER COLUMN "account_number" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "recipient_account_number" SET DATA TYPE BIGINT;
