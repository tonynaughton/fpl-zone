import { Player } from "./player";

export interface Squad {
  goalkeepers: Player[];
  defenders: Player[];
  midfielders: Player[];
  forwards: Player[];
}
