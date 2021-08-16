import { schema as accountingSchema } from './accounting';
import { schema as commonSchema } from './common';
import { schema as initialSchema } from './initial';
// import { schema as transactingSchema } from './transacting'

export const graphQLSchema = {
  accountingSchema,
  commonSchema,
  initialSchema,
  // transactingSchema
};
