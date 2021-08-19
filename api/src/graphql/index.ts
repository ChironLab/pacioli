import { makeSchema, asNexusMethod, declarativeWrappingPlugin } from 'nexus';
import { DateTimeResolver, JSONResolver } from 'graphql-scalars';
import path from 'path';
import { schema as accountingSchema } from './accounting';
import { schema as commonSchema } from './common';
import { schema as initialSchema } from './initial';
import { schema as transactingSchema } from './transacting';

//  This is custom type that extends t to t.date
const dateTimeScalar = asNexusMethod(DateTimeResolver, 'date');
const jsonScalar = asNexusMethod(JSONResolver, 'json');

//  This module breaks convention to access NODE_ENV because
//  we need the ability to execute this script through CLI
//  in case we want to manually generate the artifacts as an escape hatch
export const schema = makeSchema({
  types: [
    dateTimeScalar,
    jsonScalar,
    transactingSchema,
    accountingSchema,
    commonSchema,
    initialSchema,
  ],
  shouldGenerateArtifacts:
    process.env.SHOULD_SCHEMA_GEN === 'true' ||
    process.env.NODE_ENV === 'development',
  plugins: [
    //  New convention is t.nonNull
    declarativeWrappingPlugin(),
  ],
  outputs: {
    schema: path.join(__dirname, '../../schema.gen.graphql'),
    typegen: path.join(
      __dirname,
      '../../node_modules/@types/typegen-nexus/index.d.ts'
    ),
  },
  //  Connect nexus to prisma/client so it can get the types
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'db',
      },
    ],
  },
  //  Allows nexus to know the type of context parameter in resolver
  ...((process.env.SHOULD_SCHEMA_GEN === 'true' ||
    process.env.NODE_ENV === 'development') && {
    contextType: {
      module: path.join(__dirname, '../loaders/types.ts'),
      export: 'Context',
    },
  }),
});

export type GraphQLSchema = typeof schema;
