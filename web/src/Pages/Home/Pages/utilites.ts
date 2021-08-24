const formatToTwoDecimals = (value: number) => {
  return (Math.round(Math.abs(value) * 100) / 100).toFixed(2);
};

export const displayAccountingValue = (value = 0, shouldUseParens: boolean) => {
  const fixedValue = formatToTwoDecimals(value);

  if (value < 0 && shouldUseParens) {
    return `(${fixedValue})`;
  }
  return `${fixedValue}`;
};
