import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useQuery, useReactiveVar } from '@apollo/client';
import { DataGrid, GridSortModel } from '@material-ui/data-grid';
import { startDateVar, endDateVar } from 'Context/Apollo';
import { getAccountDetail } from 'API';
import { GetAccountDetailQuery } from 'Types/graphql-gen';
import { Container } from './styles';
import Dialog from 'Components/Dialog';
import ShowDetail from '../../Components/ShowDetail';
import { columns } from './tableColumns';

type Params = {
  accountId: string;
};

const Account = () => {
  const { accountId } = useParams<Params>();
  const [modalLookupId, setModalLookupId] = React.useState<null | string>(null);
  const [modalHeader, setModalHeader] = React.useState<string>('')

  const startDate = useReactiveVar(startDateVar);
  const endDate = useReactiveVar(endDateVar);

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    {
      field: 'postedOn',
      sort: 'asc',
    },
  ]);

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

  if (!data || !data.account) {
    return <Redirect to='/home' />;
  }

  if (!data.account.entries) {
    return <div> There are no entries </div>;
  }

  const rows = data.account.entries.reduce((acc, entry) => {
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
          ? transaction?.description
          : adjustment?.description,
      postedOn: journal.postedOn
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
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          autoHeight
          onRowClick={(e) => {
            console.log('***e', e);
            setModalLookupId(e.row.journalId as string);
            setModalHeader(e.row.type)
          }}
          pageSize={100}
          rowsPerPageOptions={[25, 50, 100]}
          disableSelectionOnClick
        />
      </Container>
      <Dialog
        isModalOpen={Boolean(modalLookupId)}
        toggleModal={() => setModalLookupId(null)}
        title={modalHeader}
      >
        <ShowDetail cacheId={modalLookupId} />
      </Dialog>
    </>
  );
};

export default Account;
