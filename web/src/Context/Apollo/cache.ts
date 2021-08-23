import { makeVar } from '@apollo/client';
import {startOfYear} from 'date-fns'

export const startDateVar = makeVar(startOfYear(new Date()))

export const endDateVar = makeVar(new Date())
