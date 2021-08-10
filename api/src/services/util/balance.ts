import type { NexusGenInputs } from 'typegen-nexus';

export const isEntryBalance = (entries: NexusGenInputs['EntryInput'][]) => {
  const total = entries.reduce(
    (acc: number, entry: NexusGenInputs['EntryInput']) => {
      return acc + entry.amount;
    },
    0
  );

  return total === 0;
};
