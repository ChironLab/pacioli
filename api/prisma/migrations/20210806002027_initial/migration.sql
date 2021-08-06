-- CreateEnum
CREATE TYPE "AccountType" AS ENUM ('ASSET', 'LIABILITY', 'EQUITY', 'REVENUE', 'EXPENSE');

-- CreateTable
CREATE TABLE "ChartOfAccounts" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "account_type" "AccountType" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Journal" (
    "id" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "locked" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Entries" (
    "id" TEXT NOT NULL,
    "chart_of_accounts_id" INTEGER NOT NULL,
    "journal_id" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerInvoices" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customers_id" INTEGER NOT NULL,
    "journal_id" TEXT NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipts" (
    "id" SERIAL NOT NULL,
    "customer_invoices_id" INTEGER NOT NULL,
    "journal_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cleared" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vendors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT,
    "phone" TEXT,
    "ein" TEXT,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VendorInvoices" (
    "id" SERIAL NOT NULL,
    "vendors_id" INTEGER NOT NULL,
    "journal_id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "paid" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payments" (
    "id" SERIAL NOT NULL,
    "vendor_invoices_id" INTEGER NOT NULL,
    "journal_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "cleared" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CustomerInvoices_journal_id_unique" ON "CustomerInvoices"("journal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Receipts_journal_id_unique" ON "Receipts"("journal_id");

-- CreateIndex
CREATE UNIQUE INDEX "VendorInvoices_journal_id_unique" ON "VendorInvoices"("journal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Payments_journal_id_unique" ON "Payments"("journal_id");

-- AddForeignKey
ALTER TABLE "Entries" ADD FOREIGN KEY ("chart_of_accounts_id") REFERENCES "ChartOfAccounts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Entries" ADD FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerInvoices" ADD FOREIGN KEY ("customers_id") REFERENCES "Customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CustomerInvoices" ADD FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipts" ADD FOREIGN KEY ("customer_invoices_id") REFERENCES "CustomerInvoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipts" ADD FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorInvoices" ADD FOREIGN KEY ("vendors_id") REFERENCES "Vendors"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorInvoices" ADD FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD FOREIGN KEY ("vendor_invoices_id") REFERENCES "VendorInvoices"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
