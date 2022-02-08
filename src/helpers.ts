import React from "react";
import { Player } from "types/player";

export function GetPlayerById(playerId?: number, players?: Player[]) {
  return players?.find((player) => player.id === playerId);
}
