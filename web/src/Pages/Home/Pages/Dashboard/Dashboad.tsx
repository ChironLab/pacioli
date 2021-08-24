import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import { getTrialBalance, GraphQLTypes } from '../../API';
import { startDateVar, endDateVar } from '../../../../Context/Apollo';
import Dialog from '../../Components/Dialog';
import Table from './AccountingTable';

const initialModalContent = {
  title: 'Accounting',
  headers: ['id', 'amount'],
  rows: [
    {
      value: 0,
      id: 'abc',
    },
  ],
};

const headers = ['Account Number', 'Account Name', 'Account Value'];

const Dashboard = () => {
  const startDate = useReactiveVar(startDateVar);
  const endDate = useReactiveVar(endDateVar);
  const [isModalOpen, toggleModal] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(initialModalContent);

  const { loading, error, data } = useQuery<GraphQLTypes['GetTrialBalance']>(
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

  if (data && !data.accounts.length) {
    return <Redirect to='/setup' />;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (error || !data) {
    return <p> ERRRROR PLEASE RELOAD </p>;
  }

  console.log(data);

  return (
    <>
      <Table
        headers={headers}
        rows={data.accounts.map((account) => {
          const { value, id, name, entries } = account;
          const rows = entries.map((entry) => {
            const { amount: value, id } = entry;
            return {
              value,
              id,
            };
          });

          return {
            id,
            name,
            value,
            onClick: () => {
              toggleModal((prev) => !prev);
              setModalContent((prev) => ({
                title: `${id} ${name}`,
                headers: prev.headers,
                rows,
              }));
            },
          };
        })}
      />
      <Dialog
        isModalOpen={isModalOpen}
        toggleModal={() => toggleModal((prevState) => !prevState)}
        title={modalContent.title}
      >
        <Table headers={modalContent.headers} rows={modalContent.rows} />
      </Dialog>
    </>
  );
};

export default Dashboard;
