import { schema as accountingSchema } from './accounting';
import { schema as commonSchema } from './common';
import { schema as initialSchema } from './initial';

export const graphQLSchema = {
  accountingSchema,
  commonSchema,
  initialSchema,
};
