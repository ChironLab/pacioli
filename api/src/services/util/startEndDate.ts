import { startOfYear } from 'date-fns';

/**
  Function to validate the range of date.
  Default to beginning of the year of current time,
  and ending of the current time.
*/
export const getStartAndEndDate = (
  startDateInput: Date | null | undefined,
  endDateInput: Date | null | undefined
) => {
  const startDate = startDateInput || startOfYear(new Date()).toISOString();
  const endDate = endDateInput || new Date().toISOString();

  return {
    startDate,
    endDate,
  };
};
