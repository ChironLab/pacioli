import { queryType, idArg } from 'nexus';
import {adjustment} from './objects'

export const getAdjustmentById = queryType({
  definition: (t) => {
    t.field('getAdjustmentById', {
      type: adjustment,
      args: {
        id: idArg({required: true})
      },
      resolve: (_root, args, context) => {
        const {id} = args;

        return context.db.adjustment.findUnique({
          where: {
            id,
          }
        })
      }
    })
  }
})
