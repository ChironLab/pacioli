import * as graphqlSchema from './objects';
import * as transactionSchema from './transaction';
import * as transactorSchema from './transactor';
import * as fields from './constants';

const schema = { graphqlSchema, transactionSchema, transactorSchema };

export { schema, fields };
