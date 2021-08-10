import * as graphqlSchema from './objects';
import * as accountSchema from './account';
import * as journalSchema from './journal';
import * as fields from './constants';

const schema = { graphqlSchema, accountSchema, journalSchema };

export { schema, fields };
