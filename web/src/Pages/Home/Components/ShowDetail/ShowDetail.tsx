import React from 'react';
import { gql } from '@apollo/client';
import { client } from 'Context/Apollo';
import {
  Stack
} from '@material-ui/core';
import Header from './Header'
import AccountingTable from '../AccountingTable'

type Props = {
  cacheId: string | null;
};

type Row = {
  id: number;
  name: string;
  value: number;
};

const headers = ['Account Number', 'Account Name', 'Account Value'];

const ShowDetail = ({ cacheId }: Props) => {
  if (!cacheId) {
    return null;
  }

  const res = client.readFragment({
    id: `Journal:${cacheId}`,
    fragment: gql`
      fragment Detail on Journal {
        postedOn
        entries {
          id
          accountId
          amount
        }
        transaction {
          description
          meta
          type
        }
        adjustment {
          description
        }
      }
    `,
  });

  console.log('*****', res);

  const rows = res.entries.reduce((acc: Row[], entry: any) => {
    if (!entry) {
      return acc;
    }

    const { amount, accountId } = entry;

    const res = client.readFragment({
      id: `Account:${accountId}`,
      fragment: gql`
        fragment Name on Account {
          name
        }
      `,
    });

    const temp = {
      id: accountId,
      value: amount,
      name: res?.name || 'default'
    };

    acc.push(temp);
    return acc;
  }, [] as Row[])


  return (<Stack>
    <Header description={res.transaction?.description || res.adjustment?.description} meta={res.transaction?.meta}/>
    <AccountingTable rows={rows} headers={headers} />
   </Stack>);
};

export default ShowDetail;
