import { makeVar, DocumentNode } from '@apollo/client';
import { startOfYear, endOfDay, isBefore, isAfter } from 'date-fns';
import { cache } from './cache';
import { client } from './client';

//  TODO: work on optimizing the query when we can return from cache
class DateManager {
  private startDate: Date;
  private endDate: Date;

  constructor() {
    const currentDate = new Date();
    this.startDate = startOfYear(currentDate);
    this.endDate = endOfDay(currentDate);
  }

  get getStartDate() {
    return this.startDate;
  }

  get getEndDate() {
    return this.endDate;
  }

  setStartDateIfBefore(date: Date) {
    if (isBefore(this.startDate, date)) {
      this.startDate = date;
    }
    return this.startDate;
  }

  setEndDateIfAfter(date: Date) {
    if (isAfter(this.endDate, date)) {
      this.endDate = date;
    }
    return this.endDate;
  }
}

const dateManager = new DateManager();

export const startDateVar = makeVar(dateManager.getStartDate);
export const endDateVar = makeVar(dateManager.getEndDate);

export const dateRangeQueryController = (
  query: DocumentNode,
  dateRange: any
) => {
  const { startDate, endDate } = dateRange;

  //  if start is before and end is before
  //  should set start
  //  query db with new start and old start
  //  return cache from old start to query end

  if (
    isBefore(dateManager.getStartDate, startDate) &&
    isBefore(dateManager.getEndDate, endDate)
  ) {
    const oldStartDate = dateManager.getStartDate;

    const newStartDate = dateManager.setStartDateIfBefore(startDate);

    return client.query({
      query,
      variables: {
        startAndEndDate: {
          startDate: newStartDate,
          endDate: oldStartDate,
        },
      },
    });
  }

  //  if start is before and end is after
  //  should set start and set end
  //  query db with new range

  if (
    isBefore(dateManager.getStartDate, startDate) &&
    isAfter(dateManager.getEndDate, endDate)
  ) {
    const newStartDate = dateManager.setStartDateIfBefore(startDate);
    const newEndDate = dateManager.setEndDateIfAfter(endDate);

    return client.query({
      query,
      variables: {
        startAndEndDate: {
          startDate: newStartDate,
          endDate: newEndDate,
        },
      },
    });
  }

  //  if start is after and end is before
  //  no set
  //  should not query db
  //  query cache

  if (
    isAfter(dateManager.getStartDate, startDate) &&
    isBefore(dateManager.getEndDate, endDate)
  ) {
    return cache.readQuery({
      query,
      variables: {
        startAndEndDate: {
          startDate,
          endDate,
        },
      },
    });
  }

  //  if start is after and end is after
  //  should set end
  //  query db with old end and new end
  //  return cache from start and old end

  if (
    isAfter(dateManager.getStartDate, startDate) &&
    isAfter(dateManager.getEndDate, endDate)
  ) {
    const oldEndDate = dateManager.getEndDate;
    const newEndDate = dateManager.setEndDateIfAfter(endDate);

    return client.query({
      query,
      variables: {
        startAndEndDate: {
          startDate: oldEndDate,
          endDate: newEndDate,
        },
      },
    });
  }

  return client.query({
    query,
    variables: {
      startAndEndDate: {
        startDate,
        endDate,
      },
    },
  });
};
