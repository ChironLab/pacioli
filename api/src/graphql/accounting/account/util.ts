import {
  ACCOUNT_WITH_ENTRY_IDS,
  ACCOUNT_WITH_ENTRY_DETAIL,
  ACCOUNT_WITH_NO_ENTRY,
} from './constants';

export const accountResolveType = (source: any) => {
  if ('entryIds' in source) {
    return ACCOUNT_WITH_ENTRY_IDS;
  }

  if ('entries' in source) {
    return ACCOUNT_WITH_ENTRY_DETAIL;
  }

  return ACCOUNT_WITH_NO_ENTRY;
};
