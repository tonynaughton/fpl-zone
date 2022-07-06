import { useContext } from "react";
import { AppDataContext } from "app_content";
import { AppData } from "types";

interface GameStatusValues {
  seasonNotStarted: boolean;
  seasonFinished: boolean;
  gameUpdating: boolean;
}

/*
  This hook is used to check the status of the following:

  1. If the season has not yet started

  2. If the season has finished

  3. If the the most recent gameweek deadline was was within the last 1 hours
    - if true, FPL data is likely to be innacurate as the game is in an
    'updating' state for approx 1 hours after each gameweek deadline
*/
export const useGameStatus = (): GameStatusValues => {
  const { gameweeks } = useContext(AppDataContext) as AppData;

  let seasonNotStarted = false;
  let seasonFinished = false;
  let gameUpdating = false;

  const currentDateTime = new Date();
  const currentGameweek = gameweeks.find(gameweek => gameweek.is_current);
  const nextGameweek = gameweeks.find(gameweek => gameweek.is_next);

  if (!currentGameweek) {
    if (!nextGameweek) {
      seasonFinished = true;
    } else {
      seasonNotStarted = true;
    }
  }

  /*
    Manually checking if next gamewek deadline has passed as there
    can sometimes be a delay in update of gameweek 'is_next' status
  */
  const relevantGameweek = (!nextGameweek || new Date(nextGameweek.deadline_time) > currentDateTime)
    ? currentGameweek
    : nextGameweek;

  if (relevantGameweek) {
    const gameweekDeadline = new Date(relevantGameweek.deadline_time);
    const timeDifference = currentDateTime.getTime() - gameweekDeadline.getTime();

    // If current time is 1 hours (3600000 ms) since deadline, game will be in 'updating' state
    if (timeDifference < 3600000) {
      gameUpdating = true;
    }
  }

  return { seasonNotStarted, seasonFinished, gameUpdating };
};
