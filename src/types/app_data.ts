import { Fixture, GameData } from "types";

export interface AppData extends GameData {
  fixtures: Fixture[];
  isCompact: boolean;
}
