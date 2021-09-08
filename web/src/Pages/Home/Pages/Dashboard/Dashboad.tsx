import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { startDateVar, endDateVar } from 'Context/Apollo';
import { getTrialBalance } from 'API';
import { GetTrialBalanceQuery } from 'Types/graphql-gen';
import Table from '../../Components/AccountingTable';

const headers = ['Account Number', 'Account Name', 'Account Value'];

type Row = {
  id: number;
  name: string;
  value: number;
  onClick: () => void;
};

const Dashboard = () => {
  const startDate = useReactiveVar(startDateVar);
  const endDate = useReactiveVar(endDateVar);
  const history = useHistory();

  const { loading, error, data } = useQuery<GetTrialBalanceQuery>(
    getTrialBalance,
    {
      variables: {
        startAndEndDate: {
          startDate,
          endDate,
        },
      },
    }
  );

  if (!data || !data.accounts || !data.accounts.length) {
    return <Redirect to='/setup' />;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <p> ERROR PLEASE RELOAD </p>;
  }

  return (
    <Table
      headers={headers}
      rows={data.accounts.reduce((acc: Row[], account) => {
        if (!account) {
          return acc;
        }

        const { value, id, name } = account;

        const temp = {
          id,
          name,
          value,
          onClick: () => {
            history.push(`/home/account/${id}`);
          },
        };

        acc.push(temp);
        return acc;
      }, [] as Row[])}
    />
  );
};

export default Dashboard;
