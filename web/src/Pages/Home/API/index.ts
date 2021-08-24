import { getTrialBalance, GetTrialBalance } from './TrialBalance';
import { getTransactors, GetTransactors } from './Transactor';

export { getTrialBalance, getTransactors };

export type GraphQLTypes = {
  GetTrialBalance: GetTrialBalance;
  GetTransactors: GetTransactors;
};
