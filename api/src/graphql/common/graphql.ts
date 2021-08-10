import { inputObjectType } from 'nexus';
import { START_AND_END_DATE, ENTRY_INPUT } from './constants';

export const startAndEndDate = inputObjectType({
  name: START_AND_END_DATE,
  definition(t) {
    t.date('startDate');
    t.date('endDate');
  },
});

export const entryInput = inputObjectType({
  name: ENTRY_INPUT,
  definition: (t) => {
    t.nonNull.int('accountId');
    t.nonNull.float('amount');
  },
});
