import { AccountType } from '@prisma/client';

const accountFactory = (
  id: number,
  name: string,
  account_type: AccountType
) => ({
  id,
  name,
  account_type,
});

export const starterAccounts = [
  accountFactory(1000, 'Cash On Hand', AccountType.ASSET),
  accountFactory(1100, 'Accounts receivable', AccountType.ASSET),
  accountFactory(1900, 'Other assets', AccountType.ASSET),
  accountFactory(3000, 'Accounts payable', AccountType.LIABILITY),
  accountFactory(3900, 'Other liabilities', AccountType.LIABILITY),
  accountFactory(5000, 'Equity', AccountType.EQUITY),
  accountFactory(5100, 'Retained earnings', AccountType.EQUITY),
  accountFactory(6001, 'Revenue', AccountType.REVENUE),
  accountFactory(8001, 'Expense', AccountType.EXPENSE),
];
