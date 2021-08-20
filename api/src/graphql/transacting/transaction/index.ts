import * as queries from './queries';
import * as objects from './objects';
import * as fields from './constants';
import * as mutations from './mutations';

const schema = {
  queries,
  objects,
  mutations,
};

export { schema, fields };
