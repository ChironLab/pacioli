import {
  JOURNAL_WITH_ENTRIES,
  JOURNAL_WITH_NO_ENTRY,
  JOURNAL_WITH_ENTRY_IDS,
} from './constants';

export const journalResolveType = (source: any) => {
  if ('entryIds' in source) {
    return JOURNAL_WITH_ENTRY_IDS;
  }

  if ('entries' in source) {
    return JOURNAL_WITH_ENTRIES;
  }

  return JOURNAL_WITH_NO_ENTRY;
};
