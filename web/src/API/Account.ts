import { gql } from '@apollo/client';

export const getAccountDetail = gql`
  query getAccountDetail($id: Int!, $startAndEndDate: StartAndEndDate!) {
    accounts(id: $id, startAndEndDate: $startAndEndDate) {
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
          entries {
            id
            amount
            accountId
          }
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
    }
  }
`;
