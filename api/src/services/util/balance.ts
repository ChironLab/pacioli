type Entry = {
  amount: number;
};

export const isEntryBalance = (entries: Entry[]) => {
  const total = entries.reduce((acc: number, entry) => acc + entry.amount, 0);

  return total === 0;
};
