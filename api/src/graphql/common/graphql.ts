import { inputObjectType } from 'nexus';
import {
  START_AND_END_DATE,
  ENTRY_CREATE_INPUT,
  ENTRY_UPDATE_INPUT,
} from './constants';

export const startAndEndDate = inputObjectType({
  name: START_AND_END_DATE,
  definition: (t) => {
    t.date('startDate');
    t.date('endDate');
  },
});

export const entryCreateInput = inputObjectType({
  name: ENTRY_CREATE_INPUT,
  definition: (t) => {
    t.nonNull.int('accountId');
    t.nonNull.float('amount');
  },
});

export const entryUpdateInput = inputObjectType({
  name: ENTRY_UPDATE_INPUT,
  definition: (t) => {
    t.id('id');
    t.nonNull.int('accountId');
    t.nonNull.float('amount');
  },
});
