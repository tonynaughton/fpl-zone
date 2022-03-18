import React from "react";
import { Fixture, Gameweek, Team } from "types";

interface ResultsProps {
  teams: Team[];
  fixtures: Fixture[];
  currentGameweek: Gameweek;
}

export default function Results({ teams, fixtures }: ResultsProps): JSX.Element {
  console.log("🚀 ~ file: results.tsx ~ line 10 ~ Results ~ fixtures", fixtures);
  console.log("🚀 ~ file: results.tsx ~ line 10 ~ Results ~ teams", teams);
  return <></>;
}
