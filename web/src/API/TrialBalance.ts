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
        journal {
          id
          postedOn
          type
          transaction {
            id
            description
            meta
            type
          }
          adjustment {
            id
            description
          }
        }
      }
      type
      active
      entryIds @client
      value @client
    }
  }
`;
