import { gql } from '@apollo/client';

export const BOOTSTRAP = gql`
  query Bootstrap($startAndEndDate: StartAndEndDate!) {
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
    transactors {
      id
      name
      type
      transactions (startAndEndDate: $startAndEndDate) {
        id
        description
        meta
        type
        journal {
          id
          createdAt
          postedOn
          type
          entries {
            id
            amount
            accountId
            journalId
          }
        }
      }
    }
  }
`;
