/**
  Cannot use nexus types because it is part of the schema.
 */

type CreateOrUpdate<T> = {
  create: T;
  update: T;
  where: {
    id: string | undefined;
  };
};

type IdMap = {
  [key: string]: number;
};

interface EntryWithNoId {
  amount: number;
  accountId: number;
}

interface EntryWithId extends EntryWithNoId {
  id: string;
}

type Accumulator = {
  createOrUpdateEntries: CreateOrUpdate<EntryWithNoId>[];
  ids: IdMap;
};

export const inputEntriesReducer = (
  acc: Accumulator,
  entry: EntryWithId | EntryWithNoId
) => {
  let temp: EntryWithNoId;
  let id: string | undefined;

  if ('id' in entry) {
    const { id: entryId, ...rest } = entry;
    acc.ids[entryId] = 1;
    temp = rest;
    id = entryId;
  } else {
    temp = entry;
  }

  acc.createOrUpdateEntries.push({
    create: temp,
    update: temp,
    where: {
      id,
    },
  });

  return acc;
};
