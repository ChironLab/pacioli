import { AccountType } from '@prisma/client';



const accountFactory = (id: number, name: string, type: AccountType) => ({
  id,
  name,
  type,
});

export type AccountMap = {
  accountIds: number[]
  [id: number]: ReturnType<typeof accountFactory>
}

export const initSpecialAccounts = () => {
  const specialAccounts = [
    accountFactory(1000, 'Cash on hand', AccountType.ASSET),
    accountFactory(1002, 'Deposit in transit', AccountType.ASSET),
    accountFactory(1100, 'Accounts receivable', AccountType.ASSET),
    accountFactory(1900, 'Other assets', AccountType.ASSET),
    accountFactory(3000, 'Accounts payable', AccountType.LIABILITY),
    accountFactory(3900, 'Other liabilities', AccountType.LIABILITY),
    accountFactory(5000, 'Equity', AccountType.EQUITY),
    accountFactory(5100, 'Retained earnings', AccountType.EQUITY),
    accountFactory(6001, 'Revenue', AccountType.REVENUE),
    accountFactory(8001, 'Expense', AccountType.EXPENSE),
  ];

  const accountMap = specialAccounts.reduce((acc: AccountMap, account) => {
    acc.accountIds.push(account.id)
    acc[account.id] = account
    return acc
  }, {accountIds: []})

  return {
    getSpecialAccountsDetails: () => specialAccounts,
    getSpecialAccountIds: () => accountMap.accountIds,
    isSpecialAccount: (id: number) => accountMap[id] ? true : false,
    getSpecialAccountMap: () => accountMap
  };
};
