import { useContext } from "react";
import { AppDataContext } from "app_content";
import { numberWithCommas } from "helpers";
import { AppData, Player } from "types";

import { SummaryStatType } from "../components/gameweek_summary/gameweek_summary";

export const useSummaryStats = (): SummaryStatType[] => {
  const { gameweeks, players } = useContext(AppDataContext) as AppData;

  const getPlayerById = (id: number): Player => players.find((player) => player.id === id)!;

  const currentGameweek = gameweeks.find((gw) => gw.is_current);

  if (!currentGameweek) return [];

  const starPlayerId = currentGameweek.top_element_info?.id;
  const starPlayer = starPlayerId ? getPlayerById(starPlayerId) : null;

  const mostTransferredIn = currentGameweek.most_transferred_in
    ? getPlayerById(currentGameweek.most_transferred_in)
    : null;

  const mostCaptained = currentGameweek.most_captained
    ? getPlayerById(currentGameweek?.most_captained)
    : null;

  const mostViceCaptained = currentGameweek.most_vice_captained
    ? getPlayerById(currentGameweek.most_vice_captained)
    : null;

  const mostTransferredInCount = mostTransferredIn
    ? numberWithCommas(mostTransferredIn?.transfers_in_event)
    : null;

  const starPlayerScore = currentGameweek.top_element_info
    ? `${currentGameweek.top_element_info?.points} pts`
    : "N/A";

  return ([
    {
      label: "highest score",
      value: `${currentGameweek.highest_score || 0} pts`
    },
    {
      label: "average score",
      value: `${currentGameweek.average_entry_score || 0} pts`
    },
    {
      label: "star player",
      teamCode: starPlayer?.team_code,
      playerName: starPlayer?.web_name || "",
      value: starPlayerScore
    },
    {
      label: "most captained",
      teamCode: mostCaptained?.team_code,
      playerName: mostCaptained ? mostCaptained.web_name : "N/A"
    },
    {
      label: "most vice-captained",
      teamCode: mostViceCaptained?.team_code,
      playerName: mostViceCaptained ? mostViceCaptained.web_name : "N/A"
    },
    {
      label: "most transferred in",
      teamCode: mostTransferredIn?.team_code,
      playerName: mostTransferredIn?.web_name || "",
      value: mostTransferredInCount || ""
    }
  ]);
};
