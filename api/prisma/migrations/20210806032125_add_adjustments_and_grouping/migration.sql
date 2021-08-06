/*
  Warnings:

  - You are about to drop the column `amount` on the `ChartOfAccounts` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ChartOfAccounts" DROP COLUMN "amount",
ADD COLUMN     "account_groups_id" INTEGER;

-- CreateTable
CREATE TABLE "AccountGroups" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "account_type" "AccountType" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adjustments" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "journal_id" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Adjustments_journal_id_unique" ON "Adjustments"("journal_id");

-- AddForeignKey
ALTER TABLE "ChartOfAccounts" ADD FOREIGN KEY ("account_groups_id") REFERENCES "AccountGroups"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Adjustments" ADD FOREIGN KEY ("journal_id") REFERENCES "Journal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
