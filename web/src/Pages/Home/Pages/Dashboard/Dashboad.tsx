import React from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';
import { Redirect } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { getTrialBalance, GraphQLTypes } from '../../API';
import { startDateVar, endDateVar } from '../../../../Context/Apollo';
import Dialog from '../../Components/Dialog';
import { displayAccountingValue } from '../utilites';
import { useStyles } from './styles';
import type { Props } from '../types';

const Dashboard = ({ isModalOpen, toggleModal }: Props) => {
  const startDate = useReactiveVar(startDateVar);
  const endDate = useReactiveVar(endDateVar);
  const classes = useStyles();

  const { loading, error, data } = useQuery<GraphQLTypes['GetTrialBalance']>(getTrialBalance, {
    variables: {
      startAndEndDate: {
        startDate,
        endDate,
      },
    },
  });

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
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>Account Number</TableCell>
              <TableCell>Account Name</TableCell>
              <TableCell>Account Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.accounts.map((account: any) => (
              <TableRow
                key={`chartOfAccount_${account.id}`}
                onClick={toggleModal}
              >
                <TableCell component='th' scope='row'>
                  {account.id}
                </TableCell>
                <TableCell>{account.name}</TableCell>
                <TableCell>
                  {displayAccountingValue(account.value, true)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog isModalOpen={isModalOpen} toggleModal={toggleModal} title={'ababab'}>
        <div> YAYAYAYA </div>
      </Dialog>
    </>
  );
};

export default Dashboard;
