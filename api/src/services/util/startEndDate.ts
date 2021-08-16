import { startOfYear } from 'date-fns';

type Result = {
  startDate: string;
  endDate: string;
};

/**
  Function to validate the range of date.
  Default to beginning of the year of current time,
  and ending of the current time.
*/
export const getStartAndEndDate = (
  startDateInput: string | null | undefined,
  endDateInput: string | null | undefined
): Result => {
  const startDate = startDateInput || startOfYear(new Date()).toISOString();
  const endDate = endDateInput || new Date().toISOString();

  return {
    startDate,
    endDate,
  };
};
