import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Tile {
  readonly id?: string;
  readonly plotCode?: number;
  readonly plotType?: string;
  readonly name?: string;
  readonly y?: number;
  readonly x?: number;
  constructor(init: ModelInit<Tile>);
}

type PlayerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Player {
  readonly id: string;
  readonly gold?: number;
  readonly xp?: number;
  readonly inventory?: (number | null)[];
  readonly tiles?: (Tile | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Player, PlayerMetaData>);
  static copyOf(source: Player, mutator: (draft: MutableModel<Player, PlayerMetaData>) => MutableModel<Player, PlayerMetaData> | void): Player;
}