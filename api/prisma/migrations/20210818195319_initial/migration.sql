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
    "accountType" "AccountType" NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" UUID NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "locked" BOOLEAN NOT NULL DEFAULT false,
    "postedOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "journalType" "JournalType" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entry" (
    "id" UUID NOT NULL,
    "accountId" INTEGER NOT NULL,
    "journalId" UUID NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adjustment" (
    "id" UUID NOT NULL,
    "description" TEXT NOT NULL,
    "journalId" UUID NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RetainedEarnings" (
    "closingDate" TIMESTAMP(3) NOT NULL,
    "beginningBalance" DOUBLE PRECISION NOT NULL
);

-- CreateTable
CREATE TABLE "Transactor" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "type" "TransactorType" NOT NULL,
    "meta" JSONB,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" UUID NOT NULL,
    "transactorId" UUID NOT NULL,
    "journalId" UUID NOT NULL,
    "type" "TransactionType" NOT NULL,
    "description" TEXT,
    "meta" JSONB,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adjustment_journalId_unique" ON "Adjustment"("journalId");

-- CreateIndex
CREATE UNIQUE INDEX "RetainedEarnings.closingDate_unique" ON "RetainedEarnings"("closingDate");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_journalId_unique" ON "Transaction"("journalId");

-- AddForeignKey
ALTER TABLE "Entry" ADD FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entry" ADD FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adjustment" ADD FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("transactorId") REFERENCES "Transactor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD FOREIGN KEY ("journalId") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
