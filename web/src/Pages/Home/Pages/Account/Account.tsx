import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useQuery, useReactiveVar } from '@apollo/client';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import { startDateVar, endDateVar } from 'Context/Apollo';
import { getAccountDetail } from 'API';
import { GetAccountDetailQuery } from 'Types/graphql-gen';
import { Container } from './styles';
import { displayAccountingValue } from 'Utilities';
import Dialog from 'Components/Dialog';
import ShowDetail from '../../Components/ShowDetail';

type Params = {
  accountId: string;
};

const columns: GridColDef[] = [
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

const Account = () => {
  const { accountId } = useParams<Params>();
  const [modalLookupId, setModalLookupId] = React.useState<null | string>(null);

  const startDate = useReactiveVar(startDateVar);
  const endDate = useReactiveVar(endDateVar);

  const { loading, error, data } = useQuery<GetAccountDetailQuery>(
    getAccountDetail,
    {
      variables: {
        id: Number(accountId),
        startAndEndDate: {
          startDate,
          endDate,
        },
      },
    }
  );

  if (loading) {
    return <div> LOADING </div>;
  }

  if (error) {
    return <div> ERRRROR </div>;
  }

  if (!data || !data.accounts) {
    return <Redirect to='/home' />;
  }

  const [account] = data.accounts;

  if (!account) {
    return <Redirect to='/home' />;
  }

  if (!account.entries) {
    return <div> There are no entries </div>;
  }

  const rows = account.entries.reduce((acc, entry) => {
    if (!entry) {
      return acc;
    }

    const { id, amount, journal, accountId } = entry;
    const {
      id: journalId,
      type: journalType,
      transaction,
      adjustment,
    } = journal;

    const temp = {
      id,
      amount,
      accountId,
      type: journalType === 'TRANSACTION' ? transaction?.type : journalType,
      journalId,
      description:
        journalType === 'TRANSACTION'
          ? transaction?.meta
          : adjustment?.description,
    };
    acc.push(temp);
    return acc;
  }, [] as any[]);

  return (
    <>
      <Container>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          onRowClick={(e) => {
            console.log('***e', e);
            setModalLookupId(e.id as string);
          }}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </Container>
      <Dialog
        isModalOpen={Boolean(modalLookupId)}
        toggleModal={() => setModalLookupId(null)}
        title='ok'
      >
        <ShowDetail cacheId={modalLookupId} />
      </Dialog>
    </>
  );
};

export default Account;
