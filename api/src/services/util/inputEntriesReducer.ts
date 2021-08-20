/**
  Cannot use nexus types because it is part of the schema.
 */

type CreateOrUpdate<T> = {
  create: T;
  update: T;
  where: {
    id: string | undefined | null;
  };
};

type IdMap = {
  [key: string]: number;
};

type Entry = {
  id?: string | null | undefined;
  amount: number;
  accountId: number;
};

type Accumulator = {
  createOrUpdateEntries: CreateOrUpdate<Entry>[];
  ids: IdMap;
};

export const inputEntriesReducer = (acc: Accumulator, entry: Entry) => {
  const { id, ...rest } = entry;

  if (id) {
    acc.ids[id] = 1;
  }

  acc.createOrUpdateEntries.push({
    create: rest,
    update: rest,
    where: {
      id,
    },
  });

  return acc;
};
