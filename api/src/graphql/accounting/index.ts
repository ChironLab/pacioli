import { fields as accountFields, schema as account } from './account';
import { fields as journalFields, schema as journal } from './journal';
import { fields as adjustmentFields, schema as adjustment } from './adjustment';

const schema = { account, journal, adjustment };
const fields = {
  account: accountFields,
  journal: journalFields,
  adjustment: adjustmentFields,
};

export { schema, fields };
