import { gql } from '@apollo/client';
import type {Account} from './types'


export const getTrialBalance = gql`
  query getTrialBalance($startAndEndDate: StartAndEndDate!) {
    accounts(startAndEndDate: $startAndEndDate) {
      id
      name
      entries {
        id
        amount
        accountId
        journalId
      }
      type
      active
      entryIds @client
      value @client
    }
  }
`;

export type GetTrialBalance = {

    accounts: Account[]
  
}
