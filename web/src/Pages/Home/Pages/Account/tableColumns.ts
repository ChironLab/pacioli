import { format } from 'date-fns';
import type { GridColDef } from '@material-ui/data-grid';
import { displayAccountingValue } from 'Utilities';

export const columns: GridColDef[] = [
  {
    field: 'postedOn',
    headerName: 'Posted Date',
    minWidth: 140,
    valueFormatter: (params) => {
      return format(params.value as Date, 'MM/dd/yyyy');
    },
  },
  { field: 'id', headerName: 'ID', minWidth: 110 },
  { field: 'accountId', headerName: 'Account ID', minWidth: 160 },
  {
    field: 'amount',
    headerName: 'Amount',
    minWidth: 160,
    valueFormatter: (params) => {
      return displayAccountingValue(params.value as number, true);
    },
  },
  { field: 'type', headerName: 'Type', minWidth: 165 },
  { field: 'description', headerName: 'Description', minWidth: 250 },
];
