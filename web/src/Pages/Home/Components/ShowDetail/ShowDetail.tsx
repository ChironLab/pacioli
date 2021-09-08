import React from 'react';
import { gql } from '@apollo/client';
import AccountingTable from '../AccountingTable';
import { client } from 'Context/Apollo';

type Props = {
  cacheId: string | null;
};

const ShowDetail = ({ cacheId }: Props) => {
  if (!cacheId) {
    return null;
  }

  const res = client.readFragment({
    id: cacheId,
    fragment: gql`
      fragment Detail on Journal {
        id
        type
        description
        entries {
          id
        }
      }
    `,
  });

  console.log('*****', res);

  return <div> yayayaya </div>;
};

export default ShowDetail;
