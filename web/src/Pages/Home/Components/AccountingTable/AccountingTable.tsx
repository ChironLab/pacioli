import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core';
import { displayAccountingValue } from 'Utilities';

type Props = {
  headers: string[];
  rows: {
    id: string | number;
    name?: string;
    value: number;
    onClick?: () => void;
  }[];
};

const AccountingTable = ({ rows, headers }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table aria-label='simple table'>
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell key={`accountingTable_${header}`}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={`entry_${row.id}`} onClick={row.onClick}>
              <TableCell component='th' scope='row'>
                {row.id}
              </TableCell>

              {row.name && <TableCell> {row.name} </TableCell>}

              <TableCell>{displayAccountingValue(row.value, true)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountingTable;
