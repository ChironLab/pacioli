import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
};

/** A single account, e.g. 1000 - Cash on hand.  */
export type Account = {
  __typename?: 'Account';
  /** Actively being used. */
  active: Scalars['Boolean'];
  /** Related entries that make up the value. */
  entries?: Maybe<Array<Maybe<Entry>>>;
  entryIds: Array<Maybe<Scalars['String']>>;
  /** Account id, range from 1000 - 9999 */
  id: Scalars['Int'];
  /** Name of the account, e.g. cash */
  name: Scalars['String'];
  /** Type of the account, e.g. asset, liabilities. */
  type: AccountType;
  value: Scalars['Float'];
};


/** A single account, e.g. 1000 - Cash on hand.  */
export type AccountEntriesArgs = {
  startAndEndDate?: Maybe<StartAndEndDate>;
};

/** Type of the account, e.g. asset, liabilities. */
export enum AccountType {
  Asset = 'ASSET',
  Liability = 'LIABILITY',
  Equity = 'EQUITY',
  Revenue = 'REVENUE',
  Expense = 'EXPENSE'
}

/** Adjustments are manually posted to affect the trial balance. */
export type Adjustment = {
  __typename?: 'Adjustment';
  /** Auto generated adjustment id using uuid. */
  id: Scalars['ID'];
  description?: Maybe<Scalars['String']>;
  journal: Journal;
};


export type Entry = {
  __typename?: 'Entry';
  id: Scalars['ID'];
  journalId: Scalars['ID'];
  accountId: Scalars['Int'];
  amount: Scalars['Float'];
  journal: Journal;
  account: Account;
};

export type EntryCreateInput = {
  accountId: Scalars['Int'];
  amount: Scalars['Float'];
};

export type EntryUpdateInput = {
  id?: Maybe<Scalars['ID']>;
  accountId: Scalars['Int'];
  amount: Scalars['Float'];
};


export type Journal = {
  __typename?: 'Journal';
  id: Scalars['ID'];
  locked: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  postedOn: Scalars['DateTime'];
  type: JournalType;
  entries: Array<Maybe<Entry>>;
  transaction?: Maybe<Transaction>;
  adjustment?: Maybe<Adjustment>;
};

export enum JournalType {
  Transaction = 'TRANSACTION',
  Adjustment = 'ADJUSTMENT'
}

export type Mutation = {
  __typename?: 'Mutation';
  createTransaction?: Maybe<Transaction>;
  deleteTransaction?: Maybe<Transaction>;
  updateTransaction?: Maybe<Transaction>;
  createOrUpdateTransactor?: Maybe<Transactor>;
  deleteTransactor?: Maybe<Transactor>;
  createOrUpdateAccount?: Maybe<Account>;
  deleteAccount?: Maybe<Scalars['String']>;
  createAdjustment?: Maybe<Adjustment>;
  deleteAdjustment?: Maybe<Adjustment>;
  updateAdjustment?: Maybe<Adjustment>;
  createSpecialAccounts: Scalars['Int'];
  createBeginningBalance: Adjustment;
};


export type MutationCreateTransactionArgs = {
  postedOn?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  entries: Array<EntryCreateInput>;
  transactorId: Scalars['ID'];
  type: TransactionType;
};


export type MutationDeleteTransactionArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateTransactionArgs = {
  id: Scalars['ID'];
  postedOn?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  entries: Array<EntryUpdateInput>;
  transactorId: Scalars['ID'];
  type: TransactionType;
};


export type MutationCreateOrUpdateTransactorArgs = {
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  type: TransactorType;
  meta?: Maybe<Scalars['JSON']>;
};


export type MutationDeleteTransactorArgs = {
  id: Scalars['ID'];
};


export type MutationCreateOrUpdateAccountArgs = {
  id: Scalars['Int'];
  name: Scalars['String'];
  type: AccountType;
};


export type MutationDeleteAccountArgs = {
  id: Scalars['Int'];
};


export type MutationCreateAdjustmentArgs = {
  postedOn?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  entries: Array<EntryCreateInput>;
};


export type MutationDeleteAdjustmentArgs = {
  id: Scalars['ID'];
};


export type MutationUpdateAdjustmentArgs = {
  id: Scalars['ID'];
  postedOn?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  entries: Array<EntryUpdateInput>;
};


export type MutationCreateBeginningBalanceArgs = {
  entries: Array<EntryCreateInput>;
};

export type Query = {
  __typename?: 'Query';
  transactionById?: Maybe<Transaction>;
  transactions: Array<Maybe<Transaction>>;
  transactors: Array<Maybe<Transactor>>;
  accounts?: Maybe<Array<Maybe<Account>>>;
  journals?: Maybe<Array<Maybe<Journal>>>;
  entries?: Maybe<Array<Maybe<Entry>>>;
  adjustmentById?: Maybe<Adjustment>;
  adjustments?: Maybe<Array<Maybe<Adjustment>>>;
};


export type QueryTransactionByIdArgs = {
  id: Scalars['ID'];
};


export type QueryTransactionsArgs = {
  startAndEndDate?: Maybe<StartAndEndDate>;
};


export type QueryAccountsArgs = {
  startAndEndDate?: Maybe<StartAndEndDate>;
  id?: Maybe<Scalars['Int']>;
};


export type QueryJournalsArgs = {
  startAndEndDate?: Maybe<StartAndEndDate>;
};


export type QueryEntriesArgs = {
  startAndEndDate?: Maybe<StartAndEndDate>;
};


export type QueryAdjustmentByIdArgs = {
  id: Scalars['ID'];
};


export type QueryAdjustmentsArgs = {
  startAndEndDate?: Maybe<StartAndEndDate>;
};

export type StartAndEndDate = {
  startDate?: Maybe<Scalars['DateTime']>;
  endDate?: Maybe<Scalars['DateTime']>;
};

export type Transaction = {
  __typename?: 'Transaction';
  id: Scalars['ID'];
  type: TransactionType;
  description?: Maybe<Scalars['String']>;
  meta?: Maybe<Scalars['JSON']>;
  journal?: Maybe<Journal>;
};

export enum TransactionType {
  VendorInvoice = 'VENDOR_INVOICE',
  CustomerInvoice = 'CUSTOMER_INVOICE',
  Receipt = 'RECEIPT',
  Payment = 'PAYMENT'
}

export type Transactor = {
  __typename?: 'Transactor';
  id: Scalars['ID'];
  name: Scalars['String'];
  type: TransactorType;
  active: Scalars['Boolean'];
  meta?: Maybe<Scalars['JSON']>;
  transactions?: Maybe<Array<Maybe<Transaction>>>;
};


export type TransactorTransactionsArgs = {
  startAndEndDate?: Maybe<StartAndEndDate>;
};

export enum TransactorType {
  Customer = 'CUSTOMER',
  Vendor = 'VENDOR'
}

export type GetAccountDetailQueryVariables = Exact<{
  id: Scalars['Int'];
  startAndEndDate: StartAndEndDate;
}>;


export type GetAccountDetailQuery = { __typename?: 'Query', accounts?: Maybe<Array<Maybe<{ __typename?: 'Account', id: number, name: string, type: AccountType, active: boolean, entries?: Maybe<Array<Maybe<{ __typename?: 'Entry', id: string, amount: number, accountId: number, journal: { __typename?: 'Journal', id: string, postedOn: any, type: JournalType, entries: Array<Maybe<{ __typename?: 'Entry', id: string, amount: number, accountId: number }>>, transaction?: Maybe<{ __typename?: 'Transaction', id: string, description?: Maybe<string>, meta?: Maybe<any>, type: TransactionType }>, adjustment?: Maybe<{ __typename?: 'Adjustment', id: string, description?: Maybe<string> }> } }>>> }>>> };

export type GetTransactorsQueryVariables = Exact<{
  startAndEndDate: StartAndEndDate;
}>;


export type GetTransactorsQuery = { __typename?: 'Query', transactors: Array<Maybe<{ __typename?: 'Transactor', id: string, name: string, type: TransactorType, meta?: Maybe<any>, transactions?: Maybe<Array<Maybe<{ __typename?: 'Transaction', id: string, description?: Maybe<string>, meta?: Maybe<any>, type: TransactionType, journal?: Maybe<{ __typename?: 'Journal', id: string, createdAt: any, postedOn: any, type: JournalType, entries: Array<Maybe<{ __typename?: 'Entry', id: string, amount: number, accountId: number, journalId: string }>> }> }>>> }>> };

export type GetTrialBalanceQueryVariables = Exact<{
  startAndEndDate: StartAndEndDate;
}>;


export type GetTrialBalanceQuery = { __typename?: 'Query', accounts?: Maybe<Array<Maybe<{ __typename?: 'Account', id: number, name: string, type: AccountType, active: boolean, entryIds: Array<Maybe<string>>, value: number, entries?: Maybe<Array<Maybe<{ __typename?: 'Entry', id: string, amount: number, accountId: number, journal: { __typename?: 'Journal', id: string, postedOn: any, type: JournalType, transaction?: Maybe<{ __typename?: 'Transaction', id: string, description?: Maybe<string>, meta?: Maybe<any>, type: TransactionType }>, adjustment?: Maybe<{ __typename?: 'Adjustment', id: string, description?: Maybe<string> }> } }>>> }>>> };


export const GetAccountDetailDocument = gql`
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

/**
 * __useGetAccountDetailQuery__
 *
 * To run a query within a React component, call `useGetAccountDetailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountDetailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAccountDetailQuery({
 *   variables: {
 *      id: // value for 'id'
 *      startAndEndDate: // value for 'startAndEndDate'
 *   },
 * });
 */
export function useGetAccountDetailQuery(baseOptions: Apollo.QueryHookOptions<GetAccountDetailQuery, GetAccountDetailQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAccountDetailQuery, GetAccountDetailQueryVariables>(GetAccountDetailDocument, options);
      }
export function useGetAccountDetailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAccountDetailQuery, GetAccountDetailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAccountDetailQuery, GetAccountDetailQueryVariables>(GetAccountDetailDocument, options);
        }
export type GetAccountDetailQueryHookResult = ReturnType<typeof useGetAccountDetailQuery>;
export type GetAccountDetailLazyQueryHookResult = ReturnType<typeof useGetAccountDetailLazyQuery>;
export type GetAccountDetailQueryResult = Apollo.QueryResult<GetAccountDetailQuery, GetAccountDetailQueryVariables>;
export const GetTransactorsDocument = gql`
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

/**
 * __useGetTransactorsQuery__
 *
 * To run a query within a React component, call `useGetTransactorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTransactorsQuery({
 *   variables: {
 *      startAndEndDate: // value for 'startAndEndDate'
 *   },
 * });
 */
export function useGetTransactorsQuery(baseOptions: Apollo.QueryHookOptions<GetTransactorsQuery, GetTransactorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTransactorsQuery, GetTransactorsQueryVariables>(GetTransactorsDocument, options);
      }
export function useGetTransactorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTransactorsQuery, GetTransactorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTransactorsQuery, GetTransactorsQueryVariables>(GetTransactorsDocument, options);
        }
export type GetTransactorsQueryHookResult = ReturnType<typeof useGetTransactorsQuery>;
export type GetTransactorsLazyQueryHookResult = ReturnType<typeof useGetTransactorsLazyQuery>;
export type GetTransactorsQueryResult = Apollo.QueryResult<GetTransactorsQuery, GetTransactorsQueryVariables>;
export const GetTrialBalanceDocument = gql`
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

/**
 * __useGetTrialBalanceQuery__
 *
 * To run a query within a React component, call `useGetTrialBalanceQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTrialBalanceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTrialBalanceQuery({
 *   variables: {
 *      startAndEndDate: // value for 'startAndEndDate'
 *   },
 * });
 */
export function useGetTrialBalanceQuery(baseOptions: Apollo.QueryHookOptions<GetTrialBalanceQuery, GetTrialBalanceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTrialBalanceQuery, GetTrialBalanceQueryVariables>(GetTrialBalanceDocument, options);
      }
export function useGetTrialBalanceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTrialBalanceQuery, GetTrialBalanceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTrialBalanceQuery, GetTrialBalanceQueryVariables>(GetTrialBalanceDocument, options);
        }
export type GetTrialBalanceQueryHookResult = ReturnType<typeof useGetTrialBalanceQuery>;
export type GetTrialBalanceLazyQueryHookResult = ReturnType<typeof useGetTrialBalanceLazyQuery>;
export type GetTrialBalanceQueryResult = Apollo.QueryResult<GetTrialBalanceQuery, GetTrialBalanceQueryVariables>;