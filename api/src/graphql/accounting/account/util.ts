import {
  ACCOUNT_WITH_DETAIL,
  ACCOUNT_NO_DETAIL,
} from './constants';

export const accountResolveType = (source: any) => {
  if ('entryIds' in source && 'entries' in source) {
    return ACCOUNT_WITH_DETAIL;
  }

  return ACCOUNT_NO_DETAIL;
};
