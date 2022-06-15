import { useContext } from "react";
import { AppDataContext } from "app_content";
import { GetPlayerById, numberWithCommas } from "helpers";
import { AppData } from "types";

import { SummaryStatType } from "../gameweek_summary";

export const useSummaryStats = (): SummaryStatType[] => {
  const { gameweeks, players } = useContext(AppDataContext) as AppData;

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const currentGameweek = gameweeks.find((gw) => gw.is_current)!;

  const starPlayerId = currentGameweek.top_element_info?.id;
  const starPlayer = starPlayerId ? GetPlayerById(starPlayerId, players) : null;

  const mostTransferredIn = currentGameweek.most_transferred_in
    ? GetPlayerById(currentGameweek.most_transferred_in, players)
    : null;

  const mostCaptained = currentGameweek.most_captained
    ? GetPlayerById(currentGameweek?.most_captained, players)
    : null;

  const mostViceCaptained = currentGameweek.most_vice_captained
    ? GetPlayerById(currentGameweek.most_vice_captained, players)
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
      value: `${currentGameweek.highest_score} pts`
    },
    {
      label: "average score",
      value: `${currentGameweek.average_entry_score} pts`
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
