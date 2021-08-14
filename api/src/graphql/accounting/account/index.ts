import * as queries from './queries';
import * as mutations from './mutations';
import * as objects from './objects';
import * as fields from './constants';

const schema = {
  queries,
  mutations,
  objects,
};

export { schema, fields };
