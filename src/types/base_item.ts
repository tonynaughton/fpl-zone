import { Player } from "./player";
import { Team } from "./team";

export type BaseItem = Player | Team;

export const isPlayer = (item: BaseItem): item is Player => {
  return "web_name" in item;
};
