import { makeSchema, asNexusMethod } from 'nexus';
import { DateTimeResolver, JSONResolver } from 'graphql-scalars';
import path from 'path';

/**
  Purpose of this is to be able to gen the t.date and t.json type
  for initial set up
 */

const dateTimeScalar = asNexusMethod(DateTimeResolver, 'date');
const jsonScalar = asNexusMethod(JSONResolver, 'json');

makeSchema({
  types: [dateTimeScalar, jsonScalar],
  shouldGenerateArtifacts:
    process.env.SHOULD_SCHEMA_GEN === 'true' ||
    process.env.NODE_ENV === 'development',
  outputs: {
    schema: path.join(__dirname, '../../schema.gen.graphql'),
    typegen: path.join(
      __dirname,
      '../../node_modules/@types/typegen-nexus/index.d.ts'
    ),
  },
});

export {};
