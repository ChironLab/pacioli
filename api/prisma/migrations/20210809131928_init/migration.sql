-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE');

-- CreateEnum
CREATE TYPE "JournalType" AS ENUM ('TRANSACTION', 'ADJUSTMENT');

-- CreateEnum
CREATE TYPE "TransactorType" AS ENUM ('CUSTOMER', 'VENDOR');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('VENDOR_INVOICE', 'CUSTOMER_INVOICE', 'RECEIPT', 'PAYMENT');

-- CreateTable
CREATE TABLE "Account" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "account_type" "AccountType" NOT NULL,
    "account_group_id" INTEGER,
    "active" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" UUID NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "posted_on" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "journal_type" "JournalType" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" UUID NOT NULL,
    "account_id" INTEGER NOT NULL,
    "journal_id" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adjustment" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "journal_id" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactor" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "ein" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "type" "TransactorType" NOT NULL,
    "meta" JSONB,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" UUID NOT NULL,
    "transactor_id" UUID NOT NULL,
    "journal_id" UUID NOT NULL,
    "transactionType" "TransactionType" NOT NULL,
    "description" TEXT,
    "meta" JSONB,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adjustment_journal_id_unique" ON "Adjustment"("journal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_journal_id_unique" ON "Transaction"("journal_id");

-- AddForeignKey
ALTER TABLE "Entry" ADD FOREIGN KEY ("account_id") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adjustment" ADD FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("transactor_id") REFERENCES "Transactor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
