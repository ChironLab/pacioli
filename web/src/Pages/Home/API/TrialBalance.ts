import { gql } from '@apollo/client';

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
