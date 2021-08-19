import { initSpecialAccounts } from './specialAccounts';

export const initAccountService = () => {
  const specialAccounts = initSpecialAccounts();
  return {
    ...specialAccounts,
  };
};
