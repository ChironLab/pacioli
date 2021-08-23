import { gql } from '@apollo/client';

export const BOOTSTRAP = gql`
  query Bootstrap($startAndEndDate: StartAndEndDate!) {
    accountsWithDetail(startAndEndDate: $startAndEndDate) {
      id
      name
      entryIds
      type
      active
    }
    entries(startAndEndDate: $startAndEndDate) {
      id
      accountId
      amount
      journalId
    }
  }
`;
