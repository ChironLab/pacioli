import { gql } from '@apollo/client';
import type { Transactor } from './types';

export const getTransactors = gql`
  query getTransactors($startAndEndDate: StartAndEndDate!) {
    transactors {
      id
      name
      type
      meta
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

export type GetTransactors = {
  transactors: Transactor[];
};
