import { makeSchema, asNexusMethod, declarativeWrappingPlugin } from 'nexus';
import { DateTimeResolver, JSONResolver } from 'graphql-scalars';
import path from 'path';
import { graphQLSchema as types } from '../graphql';

//  This is custom type that extends t to t.date
const dateTimeScalar = asNexusMethod(DateTimeResolver, 'date');
const jsonScalar = asNexusMethod(JSONResolver, 'json');

//  This module breaks convention to access NODE_ENV because
//  we need the ability to execute this script through CLI
//  in case we want to manually generate the artifacts as an escape hatch
export const schema = makeSchema({
  types: [dateTimeScalar, jsonScalar, types],
  shouldGenerateArtifacts: process.env.NODE_ENV !== 'production',
  plugins: [
    //  This is necessary because we are using {required: true} in the legacy code
    //  New convention is t.nonNull
    declarativeWrappingPlugin(),
  ],
  outputs: {
    schema: path.join(__dirname, '../../api.graphql'),
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
  ...(process.env.NODE_ENV !== 'production' && {
    contextType: {
      module: path.join(__dirname, './context.ts'),
      export: 'Context',
    },
  }),
});
