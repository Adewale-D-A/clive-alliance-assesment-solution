-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "account_number" SET DEFAULT floor(random() * 9000000000 + 1000000000);
