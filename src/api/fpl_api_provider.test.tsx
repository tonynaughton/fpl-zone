import "@testing-library/jest-dom";

import {
  getAllFixtures,
  getBestLeagues,
  getGameData,
  getGameweekData,
  getGameweekFixtures,
  getLeagueData,
  getLeagueDataWithPage,
  getPlayerData,
  getRegions,
  getTeamData,
  getTeamHistory,
  getTeamPicksForGameweek,
  getTeamTransfers
} from "./fpl_api_provider";

const mockGameweek = 20;
const mockTeamId = 11458;
const mockLeagueId = 395;
const mockPage = 3;
const mockPlayerId = 374;

describe("FPL API Provider Tests", () => {
  it("getGameData", async () => {
    const result = await getGameData();
    expect(result).toBeDefined();
  });

  it("getAllFixtures", async () => {
    const result = await getAllFixtures();
    expect(result).toBeDefined();
  });

  it("getGameweekFixtures", async () => {
    const result = await getGameweekFixtures(mockGameweek);
    expect(result).toBeDefined();
  });

  it("getGameweekData", async () => {
    const result = await getGameweekData(mockGameweek);
    expect(result).toBeDefined();
  });

  it("getTeamData", async () => {
    const result = await getTeamData(mockTeamId);
    expect(result).toBeDefined();
  });

  it("getTeamHistory", async () => {
    const result = await getTeamHistory(mockTeamId);
    expect(result).toBeDefined();
  });

  it("getTeamTransfers", async () => {
    const result = await getTeamTransfers(mockTeamId);
    expect(result).toBeDefined();
  });

  it("getTeamPicksForGameweek", async () => {
    const result = await getTeamPicksForGameweek(mockTeamId, mockGameweek);
    expect(result).toBeDefined();
  });

  it("getLeagueData", async () => {
    const result = await getLeagueData(mockLeagueId);
    expect(result).toBeDefined();
  });

  it("getLeagueDataWithPage", async () => {
    const result = await getLeagueDataWithPage(mockLeagueId, mockPage);
    expect(result).toBeDefined();
  });

  it("getPlayerData", async () => {
    const result = await getPlayerData(mockPlayerId);
    expect(result).toBeDefined();
  });

  it("getRegions", async () => {
    const result = await getRegions();
    expect(result).toBeDefined();
  });

  it("getBestLeagues", async () => {
    const result = await getBestLeagues();
    expect(result).toBeDefined();
  });
});
