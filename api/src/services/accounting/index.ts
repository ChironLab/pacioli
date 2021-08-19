import { initAccountService } from './account';

export const initAccountingService = () => {
  const account = initAccountService();

  return {
    account,
  };
};
