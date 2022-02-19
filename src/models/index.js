// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { Player, Tile } = initSchema(schema);

export {
  Player,
  Tile
};