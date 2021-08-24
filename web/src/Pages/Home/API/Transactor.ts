import { gql } from '@apollo/client';

export const getTransactors = gql`
  query getTransactors($startAndEndDate: StartAndEndDate!) {
    transactors {
      id
      name
      type
      transactions(startAndEndDate: $startAndEndDate) {
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
