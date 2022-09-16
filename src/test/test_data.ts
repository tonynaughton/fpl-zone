/* eslint-disable max-len */

import { AppData, Fixture, GameData, Phase, PlayerStat, Team } from "types";
import { GameSettings } from "types/game_settings";
import { Gameweek } from "types/gameweek";
import { Player } from "types/player";
import { Position } from "types/position";


export const mockPlayers: Player[] = [
  {
    chance_of_playing_next_round: 60,
    chance_of_playing_this_round: 80,
    code: 25771,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: 4.3,
    cost_change_start_fall: 0.6,
    dreamteam_count: 1,
    element_type: 2,
    ep_next: "lorem",
    ep_this: "nisi",
    event_points: 13,
    first_name: "Gerome",
    form: "pede",
    id: 828,
    in_dreamteam: true,
    news: "Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula.",
    news_added: new Date("3/20/2020"),
    now_cost: 88,
    photo: "http://dummyimage.com/161x192.png/ff4444/ffffff",
    points_per_game: "sed",
    second_name: "Done",
    selected_by_percent: "justo",
    special: false,
    squad_number: 5,
    status: "suspendisse",
    team: 2,
    team_code: 3,
    total_points: 121,
    transfers_in: 47208,
    transfers_in_event: 4756,
    transfers_out: 41094,
    transfers_out_event: 1931,
    value_form: "nisl",
    value_season: "tortor",
    web_name: "Jankin",
    minutes: 1451,
    goals_scored: 2,
    assists: 7,
    clean_sheets: 18,
    goals_conceded: 8,
    own_goals: 3,
    penalties_saved: 0,
    penalties_missed: 3,
    yellow_cards: 3,
    red_cards: 3,
    saves: 8,
    bonus: 2,
    bps: 9,
    influence: "dictumst",
    creativity: "consectetuer",
    threat: "ultrices",
    ict_index: "eu",
    influence_rank: 8.3,
    influence_rank_type: 10.8,
    creativity_rank: 14.6,
    creativity_rank_type: 6,
    threat_rank: 13.7,
    threat_rank_type: 16.5,
    ict_index_rank: 15.1,
    ict_index_rank_type: 12.1,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 39,
    chance_of_playing_this_round: 7,
    code: 99631,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: 3,
    cost_change_start_fall: 2.6,
    dreamteam_count: 2,
    element_type: 1,
    ep_next: "eget",
    ep_this: "dolor",
    event_points: 30,
    first_name: "Ingmar",
    form: "eu",
    id: 662,
    in_dreamteam: false,
    news: "Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh. Quisque id justo sit amet sapien dignissim vestibulum.",
    news_added: new Date("5/28/2020"),
    now_cost: 68,
    photo: "http://dummyimage.com/100x123.png/5fa2dd/ffffff",
    points_per_game: "maecenas",
    second_name: "Carwithan",
    selected_by_percent: "purus",
    special: false,
    squad_number: 98,
    status: "in",
    team: 7,
    team_code: 7,
    total_points: 26,
    transfers_in: 28423,
    transfers_in_event: 1669,
    transfers_out: 3844,
    transfers_out_event: 1114,
    value_form: "erat",
    value_season: "arcu",
    web_name: "Triner",
    minutes: 1010,
    goals_scored: 19,
    assists: 20,
    clean_sheets: 6,
    goals_conceded: 40,
    own_goals: 0,
    penalties_saved: 3,
    penalties_missed: 3,
    yellow_cards: 0,
    red_cards: 3,
    saves: 3,
    bonus: 3,
    bps: 38,
    influence: "velit",
    creativity: "mattis",
    threat: "parturient",
    ict_index: "cum",
    influence_rank: 18.5,
    influence_rank_type: 3.7,
    creativity_rank: 4.8,
    creativity_rank_type: 9.3,
    threat_rank: 7.9,
    threat_rank_type: 9.8,
    ict_index_rank: 7.7,
    ict_index_rank_type: 11.9,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 59,
    chance_of_playing_this_round: 46,
    code: 88506,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: -0.4,
    cost_change_start_fall: 4.6,
    dreamteam_count: 23,
    element_type: 3,
    ep_next: "nulla",
    ep_this: "ut",
    event_points: 6,
    first_name: "Aharon",
    form: "cubilia",
    id: 756,
    in_dreamteam: false,
    news: "Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices.",
    news_added: new Date("4/23/2021"),
    now_cost: 47,
    photo: "http://dummyimage.com/110x240.png/cc0000/ffffff",
    points_per_game: "fermentum",
    second_name: "Raccio",
    selected_by_percent: "viverra",
    special: true,
    squad_number: 55,
    status: "mi",
    team: 1,
    team_code: 14,
    total_points: 108,
    transfers_in: 8316,
    transfers_in_event: 592,
    transfers_out: 33254,
    transfers_out_event: 2567,
    value_form: "cras",
    value_season: "duis",
    web_name: "Miettinen",
    minutes: 1358,
    goals_scored: 3,
    assists: 17,
    clean_sheets: 5,
    goals_conceded: 11,
    own_goals: 3,
    penalties_saved: 0,
    penalties_missed: 0,
    yellow_cards: 1,
    red_cards: 2,
    saves: 15,
    bonus: 19,
    bps: 36,
    influence: "ut",
    creativity: "lacinia",
    threat: "justo",
    ict_index: "porttitor",
    influence_rank: 17.6,
    influence_rank_type: 5.1,
    creativity_rank: 8.6,
    creativity_rank_type: 19.3,
    threat_rank: 17.4,
    threat_rank_type: 5.2,
    ict_index_rank: 8.8,
    ict_index_rank_type: 9.8,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 35,
    chance_of_playing_this_round: 40,
    code: 24160,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: -0.7,
    cost_change_start_fall: 2,
    dreamteam_count: 14,
    element_type: 2,
    ep_next: "ut",
    ep_this: "bibendum",
    event_points: 13,
    first_name: "Mick",
    form: "ac",
    id: 324,
    in_dreamteam: true,
    news: "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus.",
    news_added: new Date("7/7/2021"),
    now_cost: 79,
    photo: "http://dummyimage.com/102x242.png/dddddd/000000",
    points_per_game: "nibh",
    second_name: "Poyzer",
    selected_by_percent: "neque",
    special: false,
    squad_number: 6,
    status: "sapien",
    team: 9,
    team_code: 6,
    total_points: 8,
    transfers_in: 14612,
    transfers_in_event: 2057,
    transfers_out: 44072,
    transfers_out_event: 4642,
    value_form: "nascetur",
    value_season: "adipiscing",
    web_name: "Summerill",
    minutes: 1068,
    goals_scored: 6,
    assists: 2,
    clean_sheets: 8,
    goals_conceded: 4,
    own_goals: 2,
    penalties_saved: 3,
    penalties_missed: 3,
    yellow_cards: 4,
    red_cards: 2,
    saves: 19,
    bonus: 9,
    bps: 40,
    influence: "tristique",
    creativity: "in",
    threat: "congue",
    ict_index: "dis",
    influence_rank: 18.6,
    influence_rank_type: 18.7,
    creativity_rank: 19.8,
    creativity_rank_type: 9.6,
    threat_rank: 0.8,
    threat_rank_type: 18.1,
    ict_index_rank: 6.6,
    ict_index_rank_type: 12.6,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 17,
    chance_of_playing_this_round: 4,
    code: 35856,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: 5,
    cost_change_start_fall: 2.1,
    dreamteam_count: 29,
    element_type: 1,
    ep_next: "egestas",
    ep_this: "justo",
    event_points: 23,
    first_name: "Pavel",
    form: "fermentum",
    id: 9,
    in_dreamteam: true,
    news: "Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.",
    news_added: new Date("6/16/2020"),
    now_cost: 51,
    photo: "http://dummyimage.com/106x233.png/dddddd/000000",
    points_per_game: "consequat",
    second_name: "McBain",
    selected_by_percent: "aliquam",
    special: false,
    squad_number: 49,
    status: "tincidunt",
    team: 19,
    team_code: 7,
    total_points: 134,
    transfers_in: 32651,
    transfers_in_event: 1142,
    transfers_out: 10059,
    transfers_out_event: 1496,
    value_form: "leo",
    value_season: "magna",
    web_name: "Bauldrey",
    minutes: 48,
    goals_scored: 14,
    assists: 10,
    clean_sheets: 20,
    goals_conceded: 30,
    own_goals: 1,
    penalties_saved: 1,
    penalties_missed: 3,
    yellow_cards: 0,
    red_cards: 3,
    saves: 20,
    bonus: 7,
    bps: 23,
    influence: "in",
    creativity: "pretium",
    threat: "orci",
    ict_index: "potenti",
    influence_rank: 6.8,
    influence_rank_type: 7.4,
    creativity_rank: 11.4,
    creativity_rank_type: 6.2,
    threat_rank: 11.8,
    threat_rank_type: 13.9,
    ict_index_rank: 18.2,
    ict_index_rank_type: 3.4,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 78,
    chance_of_playing_this_round: 47,
    code: 90663,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: 1.5,
    cost_change_start_fall: 0.6,
    dreamteam_count: 29,
    element_type: 3,
    ep_next: "proin",
    ep_this: "posuere",
    event_points: 7,
    first_name: "Gerek",
    form: "amet",
    id: 428,
    in_dreamteam: false,
    news: "Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam.",
    news_added: new Date("7/25/2020"),
    now_cost: 63,
    photo: "http://dummyimage.com/210x230.png/cc0000/ffffff",
    points_per_game: "neque",
    second_name: "Rogez",
    selected_by_percent: "vel",
    special: true,
    squad_number: 6,
    status: "maecenas",
    team: 12,
    team_code: 13,
    total_points: 118,
    transfers_in: 28758,
    transfers_in_event: 3092,
    transfers_out: 39847,
    transfers_out_event: 667,
    value_form: "vestibulum",
    value_season: "urna",
    web_name: "Macek",
    minutes: 1117,
    goals_scored: 15,
    assists: 13,
    clean_sheets: 1,
    goals_conceded: 12,
    own_goals: 1,
    penalties_saved: 0,
    penalties_missed: 1,
    yellow_cards: 5,
    red_cards: 3,
    saves: 2,
    bonus: 27,
    bps: 36,
    influence: "tempus",
    creativity: "primis",
    threat: "rhoncus",
    ict_index: "vestibulum",
    influence_rank: 6.7,
    influence_rank_type: 2.8,
    creativity_rank: 5.2,
    creativity_rank_type: 2.3,
    threat_rank: 12.6,
    threat_rank_type: 6.7,
    ict_index_rank: 4.6,
    ict_index_rank_type: 14.7,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 88,
    chance_of_playing_this_round: 33,
    code: 44957,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: -0.1,
    cost_change_start_fall: 1,
    dreamteam_count: 27,
    element_type: 3,
    ep_next: "posuere",
    ep_this: "ornare",
    event_points: 16,
    first_name: "Kipp",
    form: "sed",
    id: 938,
    in_dreamteam: false,
    news: "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
    news_added: new Date("11/2/2021"),
    now_cost: 74,
    photo: "http://dummyimage.com/209x138.png/ff4444/ffffff",
    points_per_game: "justo",
    second_name: "Santoro",
    selected_by_percent: "quis",
    special: false,
    squad_number: 24,
    status: "nisl",
    team: 12,
    team_code: 2,
    total_points: 79,
    transfers_in: 22214,
    transfers_in_event: 1847,
    transfers_out: 49220,
    transfers_out_event: 19,
    value_form: "aliquet",
    value_season: "pede",
    web_name: "Perrington",
    minutes: 224,
    goals_scored: 2,
    assists: 11,
    clean_sheets: 15,
    goals_conceded: 12,
    own_goals: 1,
    penalties_saved: 3,
    penalties_missed: 1,
    yellow_cards: 1,
    red_cards: 0,
    saves: 5,
    bonus: 23,
    bps: 15,
    influence: "velit",
    creativity: "donec",
    threat: "volutpat",
    ict_index: "lectus",
    influence_rank: 15.7,
    influence_rank_type: 11,
    creativity_rank: 14,
    creativity_rank_type: 16.7,
    threat_rank: 5.8,
    threat_rank_type: 9.4,
    ict_index_rank: 6.3,
    ict_index_rank_type: 4.5,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 74,
    chance_of_playing_this_round: 22,
    code: 16148,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: -1.5,
    cost_change_start_fall: 3.3,
    dreamteam_count: 21,
    element_type: 2,
    ep_next: "nibh",
    ep_this: "justo",
    event_points: 13,
    first_name: "Neill",
    form: "in",
    id: 929,
    in_dreamteam: false,
    news: "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.",
    news_added: new Date("10/24/2020"),
    now_cost: 60,
    photo: "http://dummyimage.com/166x181.png/dddddd/000000",
    points_per_game: "nulla",
    second_name: "Romeuf",
    selected_by_percent: "aliquet",
    special: true,
    squad_number: 45,
    status: "iaculis",
    team: 16,
    team_code: 2,
    total_points: 135,
    transfers_in: 36211,
    transfers_in_event: 1431,
    transfers_out: 13986,
    transfers_out_event: 1315,
    value_form: "tincidunt",
    value_season: "ultrices",
    web_name: "Malloy",
    minutes: 822,
    goals_scored: 10,
    assists: 20,
    clean_sheets: 14,
    goals_conceded: 4,
    own_goals: 3,
    penalties_saved: 2,
    penalties_missed: 2,
    yellow_cards: 0,
    red_cards: 3,
    saves: 4,
    bonus: 13,
    bps: 20,
    influence: "cubilia",
    creativity: "vestibulum",
    threat: "viverra",
    ict_index: "morbi",
    influence_rank: 15.1,
    influence_rank_type: 19.9,
    creativity_rank: 14.9,
    creativity_rank_type: 10.1,
    threat_rank: 3,
    threat_rank_type: 5.5,
    ict_index_rank: 7.2,
    ict_index_rank_type: 12.2,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 71,
    chance_of_playing_this_round: 65,
    code: 85162,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: 1,
    cost_change_start_fall: 0,
    dreamteam_count: 4,
    element_type: 1,
    ep_next: "interdum",
    ep_this: "pellentesque",
    event_points: 16,
    first_name: "Huberto",
    form: "justo",
    id: 550,
    in_dreamteam: false,
    news: "Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus.",
    news_added: new Date("4/23/2021"),
    now_cost: 41,
    photo: "http://dummyimage.com/109x248.png/ff4444/ffffff",
    points_per_game: "consequat",
    second_name: "Blucher",
    selected_by_percent: "varius",
    special: false,
    squad_number: 71,
    status: "nulla",
    team: 20,
    team_code: 5,
    total_points: 135,
    transfers_in: 11066,
    transfers_in_event: 4878,
    transfers_out: 26591,
    transfers_out_event: 156,
    value_form: "quis",
    value_season: "aliquet",
    web_name: "Clampe",
    minutes: 181,
    goals_scored: 4,
    assists: 20,
    clean_sheets: 8,
    goals_conceded: 20,
    own_goals: 2,
    penalties_saved: 3,
    penalties_missed: 1,
    yellow_cards: 0,
    red_cards: 3,
    saves: 20,
    bonus: 10,
    bps: 2,
    influence: "tortor",
    creativity: "ut",
    threat: "vehicula",
    ict_index: "eget",
    influence_rank: 16.9,
    influence_rank_type: 20,
    creativity_rank: 17.9,
    creativity_rank_type: 6.8,
    threat_rank: 19.6,
    threat_rank_type: 13.5,
    ict_index_rank: 15.5,
    ict_index_rank_type: 17.9,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 3,
    chance_of_playing_this_round: 8,
    code: 29986,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: -2.6,
    cost_change_start_fall: 1.4,
    dreamteam_count: 21,
    element_type: 3,
    ep_next: "morbi",
    ep_this: "iaculis",
    event_points: 24,
    first_name: "Ryon",
    form: "id",
    id: 505,
    in_dreamteam: true,
    news: "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis.",
    news_added: new Date("12/19/2021"),
    now_cost: 54,
    photo: "http://dummyimage.com/233x147.png/5fa2dd/ffffff",
    points_per_game: "dictumst",
    second_name: "Clarricoates",
    selected_by_percent: "vestibulum",
    special: false,
    squad_number: 73,
    status: "libero",
    team: 15,
    team_code: 18,
    total_points: 59,
    transfers_in: 21218,
    transfers_in_event: 4918,
    transfers_out: 41805,
    transfers_out_event: 4308,
    value_form: "dictumst",
    value_season: "justo",
    web_name: "Muller",
    minutes: 341,
    goals_scored: 11,
    assists: 16,
    clean_sheets: 11,
    goals_conceded: 20,
    own_goals: 0,
    penalties_saved: 1,
    penalties_missed: 2,
    yellow_cards: 2,
    red_cards: 3,
    saves: 14,
    bonus: 19,
    bps: 48,
    influence: "justo",
    creativity: "semper",
    threat: "in",
    ict_index: "justo",
    influence_rank: 5.3,
    influence_rank_type: 8.6,
    creativity_rank: 6.2,
    creativity_rank_type: 7.6,
    threat_rank: 9.1,
    threat_rank_type: 5.8,
    ict_index_rank: 1.2,
    ict_index_rank_type: 13.9,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 69,
    chance_of_playing_this_round: 55,
    code: 63852,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: -0.6,
    cost_change_start_fall: 4.1,
    dreamteam_count: 15,
    element_type: 2,
    ep_next: "sit",
    ep_this: "eleifend",
    event_points: 9,
    first_name: "Traver",
    form: "vivamus",
    id: 156,
    in_dreamteam: false,
    news: "Integer a nibh. In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.",
    news_added: new Date("5/14/2020"),
    now_cost: 45,
    photo: "http://dummyimage.com/244x162.png/ff4444/ffffff",
    points_per_game: "vel",
    second_name: "Scantleberry",
    selected_by_percent: "nulla",
    special: false,
    squad_number: 38,
    status: "eleifend",
    team: 13,
    team_code: 14,
    total_points: 9,
    transfers_in: 43219,
    transfers_in_event: 3703,
    transfers_out: 34959,
    transfers_out_event: 4756,
    value_form: "id",
    value_season: "sit",
    web_name: "Turbefield",
    minutes: 9,
    goals_scored: 6,
    assists: 12,
    clean_sheets: 2,
    goals_conceded: 45,
    own_goals: 1,
    penalties_saved: 1,
    penalties_missed: 2,
    yellow_cards: 3,
    red_cards: 2,
    saves: 15,
    bonus: 22,
    bps: 22,
    influence: "nunc",
    creativity: "eu",
    threat: "augue",
    ict_index: "ornare",
    influence_rank: 13.5,
    influence_rank_type: 13,
    creativity_rank: 0.3,
    creativity_rank_type: 9.5,
    threat_rank: 13.3,
    threat_rank_type: 0,
    ict_index_rank: 1.6,
    ict_index_rank_type: 1.5,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 87,
    chance_of_playing_this_round: 84,
    code: 19840,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: 2.7,
    cost_change_start_fall: 2.7,
    dreamteam_count: 8,
    element_type: 2,
    ep_next: "ullamcorper",
    ep_this: "a",
    event_points: 7,
    first_name: "Klaus",
    form: "mattis",
    id: 286,
    in_dreamteam: true,
    news: "Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst.",
    news_added: new Date("1/10/2022"),
    now_cost: 45,
    photo: "http://dummyimage.com/154x126.png/cc0000/ffffff",
    points_per_game: "massa",
    second_name: "Lovemore",
    selected_by_percent: "nec",
    special: false,
    squad_number: 49,
    status: "maecenas",
    team: 11,
    team_code: 5,
    total_points: 81,
    transfers_in: 26957,
    transfers_in_event: 1493,
    transfers_out: 32964,
    transfers_out_event: 4645,
    value_form: "lacus",
    value_season: "id",
    web_name: "MacMenemy",
    minutes: 1209,
    goals_scored: 2,
    assists: 0,
    clean_sheets: 10,
    goals_conceded: 5,
    own_goals: 0,
    penalties_saved: 3,
    penalties_missed: 0,
    yellow_cards: 2,
    red_cards: 3,
    saves: 14,
    bonus: 3,
    bps: 19,
    influence: "sapien",
    creativity: "velit",
    threat: "at",
    ict_index: "massa",
    influence_rank: 18.3,
    influence_rank_type: 17.7,
    creativity_rank: 12,
    creativity_rank_type: 9.3,
    threat_rank: 10.7,
    threat_rank_type: 5.3,
    ict_index_rank: 3.2,
    ict_index_rank_type: 12.9,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 34,
    chance_of_playing_this_round: 5,
    code: 28045,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: 1.9,
    cost_change_start_fall: 1.3,
    dreamteam_count: 18,
    element_type: 3,
    ep_next: "luctus",
    ep_this: "sit",
    event_points: 12,
    first_name: "Pippo",
    form: "feugiat",
    id: 137,
    in_dreamteam: false,
    news: "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.",
    news_added: new Date("10/22/2021"),
    now_cost: 54,
    photo: "http://dummyimage.com/105x221.png/ff4444/ffffff",
    points_per_game: "non",
    second_name: "Schriren",
    selected_by_percent: "maecenas",
    special: false,
    squad_number: 93,
    status: "quis",
    team: 13,
    team_code: 19,
    total_points: 103,
    transfers_in: 45140,
    transfers_in_event: 1531,
    transfers_out: 6983,
    transfers_out_event: 1067,
    value_form: "justo",
    value_season: "tellus",
    web_name: "Tingley",
    minutes: 583,
    goals_scored: 8,
    assists: 6,
    clean_sheets: 8,
    goals_conceded: 36,
    own_goals: 2,
    penalties_saved: 2,
    penalties_missed: 2,
    yellow_cards: 2,
    red_cards: 0,
    saves: 20,
    bonus: 27,
    bps: 9,
    influence: "lectus",
    creativity: "a",
    threat: "nibh",
    ict_index: "ut",
    influence_rank: 14.8,
    influence_rank_type: 1.7,
    creativity_rank: 10.4,
    creativity_rank_type: 15.3,
    threat_rank: 17.1,
    threat_rank_type: 16.7,
    ict_index_rank: 1.4,
    ict_index_rank_type: 14.1,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 76,
    chance_of_playing_this_round: 46,
    code: 73952,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: 0.9,
    cost_change_start_fall: 2.9,
    dreamteam_count: 16,
    element_type: 2,
    ep_next: "nulla",
    ep_this: "nibh",
    event_points: 4,
    first_name: "Ange",
    form: "fusce",
    id: 304,
    in_dreamteam: true,
    news: "In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum.",
    news_added: new Date("9/18/2021"),
    now_cost: 72,
    photo: "http://dummyimage.com/151x141.png/5fa2dd/ffffff",
    points_per_game: "in",
    second_name: "Desseine",
    selected_by_percent: "pede",
    special: true,
    squad_number: 3,
    status: "a",
    team: 19,
    team_code: 13,
    total_points: 32,
    transfers_in: 39253,
    transfers_in_event: 4569,
    transfers_out: 33129,
    transfers_out_event: 2807,
    value_form: "eget",
    value_season: "cras",
    web_name: "Sives",
    minutes: 0,
    goals_scored: 17,
    assists: 6,
    clean_sheets: 2,
    goals_conceded: 26,
    own_goals: 2,
    penalties_saved: 0,
    penalties_missed: 3,
    yellow_cards: 1,
    red_cards: 0,
    saves: 10,
    bonus: 30,
    bps: 19,
    influence: "leo",
    creativity: "posuere",
    threat: "facilisi",
    ict_index: "posuere",
    influence_rank: 5.8,
    influence_rank_type: 6.7,
    creativity_rank: 2.8,
    creativity_rank_type: 14,
    threat_rank: 7.9,
    threat_rank_type: 1.8,
    ict_index_rank: 18.3,
    ict_index_rank_type: 17.2,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  },
  {
    chance_of_playing_next_round: 28,
    chance_of_playing_this_round: 94,
    code: 73900,
    cost_change_event: 0,
    cost_change_event_fall: 0,
    cost_change_start: 4.5,
    cost_change_start_fall: 4.9,
    dreamteam_count: 1,
    element_type: 4,
    ep_next: "semper",
    ep_this: "nisl",
    event_points: 22,
    first_name: "Lonnie",
    form: "porttitor",
    id: 466,
    in_dreamteam: true,
    news: "",
    news_added: new Date("6/12/2020"),
    now_cost: 85,
    photo: "http://dummyimage.com/121x246.png/dddddd/000000",
    points_per_game: "vel",
    second_name: "Klee",
    selected_by_percent: "aenean",
    special: true,
    squad_number: 79,
    status: "cras",
    team: 3,
    team_code: 19,
    total_points: 82,
    transfers_in: 17632,
    transfers_in_event: 4170,
    transfers_out: 12266,
    transfers_out_event: 2246,
    value_form: "elementum",
    value_season: "penatibus",
    web_name: "Workes",
    minutes: 437,
    goals_scored: 4,
    assists: 2,
    clean_sheets: 12,
    goals_conceded: 38,
    own_goals: 1,
    penalties_saved: 0,
    penalties_missed: 2,
    yellow_cards: 2,
    red_cards: 2,
    saves: 13,
    bonus: 4,
    bps: 18,
    influence: "pellentesque",
    creativity: "mi",
    threat: "nunc",
    ict_index: "luctus",
    influence_rank: 10.7,
    influence_rank_type: 16.7,
    creativity_rank: 2.4,
    creativity_rank_type: 14.4,
    threat_rank: 5.1,
    threat_rank_type: 11.6,
    ict_index_rank: 11.1,
    ict_index_rank_type: 12.3,
    corners_and_indirect_freekicks_order: null,
    corners_and_indirect_freekicks_text: "",
    direct_freekicks_order: null,
    direct_freekicks_text: "",
    penalties_order: null,
    penalties_text: ""
  }
];

export const mockPositions: Position[] = [
  {
    element_count: 82,
    id: 1,
    plural_name: "Goalkeepers",
    plural_name_short: "GKP",
    singular_name: "Goalkeeper",
    singular_name_short: "GKP",
    squad_max_play: 1,
    squad_min_play: 1,
    squad_select: 2,
    sub_positions_locked: [12],
    ui_shirt_specific: true
  },
  {
    element_count: 239,
    id: 2,
    plural_name: "Defenders",
    plural_name_short: "DEF",
    singular_name: "Defender",
    singular_name_short: "DEF",
    squad_max_play: 5,
    squad_min_play: 3,
    squad_select: 5,
    sub_positions_locked: [],
    ui_shirt_specific: false
  },
  {
    element_count: 291,
    id: 3,
    plural_name: "Midfielders",
    plural_name_short: "MID",
    singular_name: "Midfielder",
    singular_name_short: "MID",
    squad_max_play: 5,
    squad_min_play: 2,
    squad_select: 5,
    sub_positions_locked: [],
    ui_shirt_specific: false
  },
  {
    element_count: 93,
    id: 4,
    plural_name: "Forwards",
    plural_name_short: "FWD",
    singular_name: "Forward",
    singular_name_short: "FWD",
    squad_max_play: 3,
    squad_min_play: 1,
    squad_select: 3,
    sub_positions_locked: [],
    ui_shirt_specific: false
  }
];

export const mockGameweeks: Gameweek[] = [
  {
    id: 1,
    name: "Gameweek 1",
    deadline_time: "2021-08-13T17:30:00Z",
    average_entry_score: 69,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 5059647,
    deadline_time_epoch: 1628875800,
    deadline_time_game_offset: 0,
    highest_score: 150,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 145658
      },
      {
        chip_name: "3xc",
        num_played: 225749
      }
    ],
    most_selected: 275,
    most_transferred_in: 1,
    top_element: 277,
    top_element_info: {
      id: 277,
      points: 20
    },
    transfers_made: 0,
    most_captained: 233,
    most_vice_captained: 277
  },
  {
    id: 2,
    name: "Gameweek 2",
    deadline_time: "2021-08-21T10:00:00Z",
    average_entry_score: 56,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 6882931,
    deadline_time_epoch: 1629540000,
    deadline_time_game_offset: 0,
    highest_score: 146,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 95038
      },
      {
        chip_name: "freehit",
        num_played: 102410
      },
      {
        chip_name: "wildcard",
        num_played: 277209
      },
      {
        chip_name: "3xc",
        num_played: 269514
      }
    ],
    most_selected: 277,
    most_transferred_in: 272,
    top_element: 142,
    top_element_info: {
      id: 142,
      points: 18
    },
    transfers_made: 12038724,
    most_captained: 233,
    most_vice_captained: 277
  },
  {
    id: 3,
    name: "Gameweek 3",
    deadline_time: "2021-08-28T10:00:00Z",
    average_entry_score: 54,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 7516002,
    deadline_time_epoch: 1630144800,
    deadline_time_game_offset: 0,
    highest_score: 119,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 94049
      },
      {
        chip_name: "freehit",
        num_played: 117627
      },
      {
        chip_name: "wildcard",
        num_played: 372083
      },
      {
        chip_name: "3xc",
        num_played: 138714
      }
    ],
    most_selected: 277,
    most_transferred_in: 419,
    top_element: 268,
    top_element_info: {
      id: 268,
      points: 18
    },
    transfers_made: 15553648,
    most_captained: 277,
    most_vice_captained: 277
  },
  {
    id: 4,
    name: "Gameweek 4",
    deadline_time: "2021-09-11T10:00:00Z",
    average_entry_score: 57,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 7797969,
    deadline_time_epoch: 1631354400,
    deadline_time_game_offset: 0,
    highest_score: 120,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 77204
      },
      {
        chip_name: "freehit",
        num_played: 168976
      },
      {
        chip_name: "wildcard",
        num_played: 1117718
      },
      {
        chip_name: "3xc",
        num_played: 157121
      }
    ],
    most_selected: 233,
    most_transferred_in: 579,
    top_element: 432,
    top_element_info: {
      id: 432,
      points: 13
    },
    transfers_made: 28985870,
    most_captained: 233,
    most_vice_captained: 233
  },
  {
    id: 5,
    name: "Gameweek 5",
    deadline_time: "2021-09-17T17:30:00Z",
    average_entry_score: 55,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 3139954,
    deadline_time_epoch: 1631899800,
    deadline_time_game_offset: 0,
    highest_score: 144,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 49533
      },
      {
        chip_name: "freehit",
        num_played: 127510
      },
      {
        chip_name: "wildcard",
        num_played: 708431
      },
      {
        chip_name: "3xc",
        num_played: 104192
      }
    ],
    most_selected: 233,
    most_transferred_in: 579,
    top_element: 44,
    top_element_info: {
      id: 44,
      points: 15
    },
    transfers_made: 18706283,
    most_captained: 233,
    most_vice_captained: 579
  },
  {
    id: 6,
    name: "Gameweek 6",
    deadline_time: "2021-09-25T10:00:00Z",
    average_entry_score: 43,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 1367510,
    deadline_time_epoch: 1632564000,
    deadline_time_game_offset: 0,
    highest_score: 117,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 76495
      },
      {
        chip_name: "freehit",
        num_played: 98223
      },
      {
        chip_name: "wildcard",
        num_played: 308300
      },
      {
        chip_name: "3xc",
        num_played: 134785
      }
    ],
    most_selected: 233,
    most_transferred_in: 413,
    top_element: 36,
    top_element_info: {
      id: 36,
      points: 15
    },
    transfers_made: 13021763,
    most_captained: 579,
    most_vice_captained: 233
  },
  {
    id: 7,
    name: "Gameweek 7",
    deadline_time: "2021-10-02T10:00:00Z",
    average_entry_score: 38,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 8298401,
    deadline_time_epoch: 1633168800,
    deadline_time_game_offset: 0,
    highest_score: 102,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 58931
      },
      {
        chip_name: "freehit",
        num_played: 89810
      },
      {
        chip_name: "wildcard",
        num_played: 292085
      },
      {
        chip_name: "3xc",
        num_played: 75135
      }
    ],
    most_selected: 233,
    most_transferred_in: 127,
    top_element: 190,
    top_element_info: {
      id: 190,
      points: 15
    },
    transfers_made: 12625013,
    most_captained: 579,
    most_vice_captained: 233
  },
  {
    id: 8,
    name: "Gameweek 8",
    deadline_time: "2021-10-16T10:00:00Z",
    average_entry_score: 49,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 8392863,
    deadline_time_epoch: 1634378400,
    deadline_time_game_offset: 0,
    highest_score: 122,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 54764
      },
      {
        chip_name: "freehit",
        num_played: 74544
      },
      {
        chip_name: "wildcard",
        num_played: 274188
      },
      {
        chip_name: "3xc",
        num_played: 102108
      }
    ],
    most_selected: 233,
    most_transferred_in: 256,
    top_element: 228,
    top_element_info: {
      id: 228,
      points: 20
    },
    transfers_made: 12142633,
    most_captained: 233,
    most_vice_captained: 579
  },
  {
    id: 9,
    name: "Gameweek 9",
    deadline_time: "2021-10-22T17:30:00Z",
    average_entry_score: 64,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 8103512,
    deadline_time_epoch: 1634923800,
    deadline_time_game_offset: 0,
    highest_score: 165,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 46614
      },
      {
        chip_name: "freehit",
        num_played: 85712
      },
      {
        chip_name: "wildcard",
        num_played: 167651
      },
      {
        chip_name: "3xc",
        num_played: 49975
      }
    ],
    most_selected: 233,
    most_transferred_in: 205,
    top_element: 138,
    top_element_info: {
      id: 138,
      points: 24
    },
    transfers_made: 11147906,
    most_captained: 233,
    most_vice_captained: 233
  },
  {
    id: 10,
    name: "Gameweek 10",
    deadline_time: "2021-10-30T10:00:00Z",
    average_entry_score: 42,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 8257657,
    deadline_time_epoch: 1635588000,
    deadline_time_game_offset: 0,
    highest_score: 116,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 50931
      },
      {
        chip_name: "freehit",
        num_played: 96697
      },
      {
        chip_name: "wildcard",
        num_played: 189850
      },
      {
        chip_name: "3xc",
        num_played: 156449
      }
    ],
    most_selected: 233,
    most_transferred_in: 138,
    top_element: 142,
    top_element_info: {
      id: 142,
      points: 21
    },
    transfers_made: 12690241,
    most_captained: 233,
    most_vice_captained: 205
  },
  {
    id: 11,
    name: "Gameweek 11",
    deadline_time: "2021-11-05T18:30:00Z",
    average_entry_score: 42,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 282096,
    deadline_time_epoch: 1636137000,
    deadline_time_game_offset: 0,
    highest_score: 116,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 68950
      },
      {
        chip_name: "freehit",
        num_played: 58097
      },
      {
        chip_name: "wildcard",
        num_played: 96628
      },
      {
        chip_name: "3xc",
        num_played: 46698
      }
    ],
    most_selected: 233,
    most_transferred_in: 142,
    top_element: 256,
    top_element_info: {
      id: 256,
      points: 14
    },
    transfers_made: 9011081,
    most_captained: 233,
    most_vice_captained: 579
  },
  {
    id: 12,
    name: "Gameweek 12",
    deadline_time: "2021-11-20T11:00:00Z",
    average_entry_score: 57,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 8483204,
    deadline_time_epoch: 1637406000,
    deadline_time_game_offset: 0,
    highest_score: 135,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 54467
      },
      {
        chip_name: "freehit",
        num_played: 53008
      },
      {
        chip_name: "wildcard",
        num_played: 118724
      },
      {
        chip_name: "3xc",
        num_played: 60239
      }
    ],
    most_selected: 233,
    most_transferred_in: 144,
    top_element: 38,
    top_element_info: {
      id: 38,
      points: 15
    },
    transfers_made: 9746013,
    most_captained: 233,
    most_vice_captained: 233
  },
  {
    id: 13,
    name: "Gameweek 13",
    deadline_time: "2021-11-27T11:00:00Z",
    average_entry_score: 44,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 5696552,
    deadline_time_epoch: 1638010800,
    deadline_time_game_offset: 0,
    highest_score: 132,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 56266
      },
      {
        chip_name: "freehit",
        num_played: 50861
      },
      {
        chip_name: "wildcard",
        num_played: 90601
      },
      {
        chip_name: "3xc",
        num_played: 98808
      }
    ],
    most_selected: 233,
    most_transferred_in: 142,
    top_element: 212,
    top_element_info: {
      id: 212,
      points: 16
    },
    transfers_made: 9284925,
    most_captained: 233,
    most_vice_captained: 579
  },
  {
    id: 14,
    name: "Gameweek 14",
    deadline_time: "2021-11-30T18:00:00Z",
    average_entry_score: 58,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 2433836,
    deadline_time_epoch: 1638295200,
    deadline_time_game_offset: 0,
    highest_score: 126,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 30119
      },
      {
        chip_name: "freehit",
        num_played: 30092
      },
      {
        chip_name: "wildcard",
        num_played: 48051
      },
      {
        chip_name: "3xc",
        num_played: 41810
      }
    ],
    most_selected: 233,
    most_transferred_in: 240,
    top_element: 233,
    top_element_info: {
      id: 233,
      points: 15
    },
    transfers_made: 6239197,
    most_captained: 233,
    most_vice_captained: 233
  },
  {
    id: 15,
    name: "Gameweek 15",
    deadline_time: "2021-12-04T11:00:00Z",
    average_entry_score: 43,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 1224173,
    deadline_time_epoch: 1638615600,
    deadline_time_game_offset: 0,
    highest_score: 114,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 42048
      },
      {
        chip_name: "freehit",
        num_played: 34252
      },
      {
        chip_name: "wildcard",
        num_played: 55027
      },
      {
        chip_name: "3xc",
        num_played: 56527
      }
    ],
    most_selected: 233,
    most_transferred_in: 450,
    top_element: 45,
    top_element_info: {
      id: 45,
      points: 17
    },
    transfers_made: 7556146,
    most_captained: 233,
    most_vice_captained: 579
  },
  {
    id: 16,
    name: "Gameweek 16",
    deadline_time: "2021-12-10T18:30:00Z",
    average_entry_score: 55,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 6881091,
    deadline_time_epoch: 1639161000,
    deadline_time_game_offset: 0,
    highest_score: 128,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 31385
      },
      {
        chip_name: "freehit",
        num_played: 114979
      },
      {
        chip_name: "wildcard",
        num_played: 113709
      },
      {
        chip_name: "3xc",
        num_played: 67059
      }
    ],
    most_selected: 233,
    most_transferred_in: 261,
    top_element: 210,
    top_element_info: {
      id: 210,
      points: 16
    },
    transfers_made: 10664848,
    most_captained: 233,
    most_vice_captained: 579
  },
  {
    id: 17,
    name: "Gameweek 17",
    deadline_time: "2021-12-14T18:15:00Z",
    average_entry_score: 45,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 8741274,
    deadline_time_epoch: 1639505700,
    deadline_time_game_offset: 0,
    highest_score: 127,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 27449
      },
      {
        chip_name: "freehit",
        num_played: 95245
      },
      {
        chip_name: "wildcard",
        num_played: 70462
      },
      {
        chip_name: "3xc",
        num_played: 164689
      }
    ],
    most_selected: 233,
    most_transferred_in: 450,
    top_element: 251,
    top_element_info: {
      id: 251,
      points: 16
    },
    transfers_made: 8595948,
    most_captained: 233,
    most_vice_captained: 261
  },
  {
    id: 18,
    name: "Gameweek 18",
    deadline_time: "2021-12-18T16:00:00Z",
    average_entry_score: 39,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 1848785,
    deadline_time_epoch: 1639843200,
    deadline_time_game_offset: 0,
    highest_score: 121,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 11265
      },
      {
        chip_name: "freehit",
        num_played: 387457
      },
      {
        chip_name: "wildcard",
        num_played: 75472
      },
      {
        chip_name: "3xc",
        num_played: 22698
      }
    ],
    most_selected: 233,
    most_transferred_in: 40,
    top_element: 256,
    top_element_info: {
      id: 256,
      points: 18
    },
    transfers_made: 12347450,
    most_captained: 233,
    most_vice_captained: 233
  },
  {
    id: 19,
    name: "Gameweek 19",
    deadline_time: "2021-12-26T13:30:00Z",
    average_entry_score: 36,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 345569,
    deadline_time_epoch: 1640525400,
    deadline_time_game_offset: 0,
    highest_score: 119,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 23155
      },
      {
        chip_name: "freehit",
        num_played: 704625
      },
      {
        chip_name: "wildcard",
        num_played: 89658
      },
      {
        chip_name: "3xc",
        num_played: 45125
      }
    ],
    most_selected: 233,
    most_transferred_in: 26,
    top_element: 362,
    top_element_info: {
      id: 362,
      points: 17
    },
    transfers_made: 15207961,
    most_captained: 233,
    most_vice_captained: 579
  },
  {
    id: 20,
    name: "Gameweek 20",
    deadline_time: "2021-12-28T13:30:00Z",
    average_entry_score: 37,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 4157378,
    deadline_time_epoch: 1640698200,
    deadline_time_game_offset: 0,
    highest_score: 105,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 8301
      },
      {
        chip_name: "freehit",
        num_played: 347024
      },
      {
        chip_name: "wildcard",
        num_played: 72928
      },
      {
        chip_name: "3xc",
        num_played: 19132
      }
    ],
    most_selected: 233,
    most_transferred_in: 413,
    top_element: 200,
    top_element_info: {
      id: 200,
      points: 15
    },
    transfers_made: 8682576,
    most_captained: 233,
    most_vice_captained: 579
  },
  {
    id: 21,
    name: "Gameweek 21",
    deadline_time: "2022-01-01T11:00:00Z",
    average_entry_score: 46,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 542969,
    deadline_time_epoch: 1641034800,
    deadline_time_game_offset: 0,
    highest_score: 129,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 29973
      },
      {
        chip_name: "freehit",
        num_played: 330165
      },
      {
        chip_name: "wildcard",
        num_played: 299381
      },
      {
        chip_name: "3xc",
        num_played: 48107
      }
    ],
    most_selected: 233,
    most_transferred_in: 420,
    top_element: 420,
    top_element_info: {
      id: 420,
      points: 21
    },
    transfers_made: 13412732,
    most_captained: 233,
    most_vice_captained: 233
  },
  {
    id: 22,
    name: "Gameweek 22",
    deadline_time: "2022-01-14T18:30:00Z",
    average_entry_score: 51,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 3532161,
    deadline_time_epoch: 1642185000,
    deadline_time_game_offset: 0,
    highest_score: 145,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 57393
      },
      {
        chip_name: "freehit",
        num_played: 677118
      },
      {
        chip_name: "wildcard",
        num_played: 585135
      },
      {
        chip_name: "3xc",
        num_played: 56338
      }
    ],
    most_selected: 237,
    most_transferred_in: 240,
    top_element: 277,
    top_element_info: {
      id: 277,
      points: 23
    },
    transfers_made: 23424094,
    most_captained: 233,
    most_vice_captained: 579
  },
  {
    id: 23,
    name: "Gameweek 23",
    deadline_time: "2022-01-21T18:30:00Z",
    average_entry_score: 35,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 7969316,
    deadline_time_epoch: 1642789800,
    deadline_time_game_offset: 0,
    highest_score: 107,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 56752
      },
      {
        chip_name: "freehit",
        num_played: 78202
      },
      {
        chip_name: "wildcard",
        num_played: 259651
      },
      {
        chip_name: "3xc",
        num_played: 36867
      }
    ],
    most_selected: 237,
    most_transferred_in: 681,
    top_element: 112,
    top_element_info: {
      id: 112,
      points: 19
    },
    transfers_made: 12666677,
    most_captained: 233,
    most_vice_captained: 579
  },
  {
    id: 24,
    name: "Gameweek 24",
    deadline_time: "2022-02-08T18:15:00Z",
    average_entry_score: 50,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 563811,
    deadline_time_epoch: 1644344100,
    deadline_time_game_offset: 0,
    highest_score: 136,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 35256
      },
      {
        chip_name: "freehit",
        num_played: 65881
      },
      {
        chip_name: "wildcard",
        num_played: 230589
      },
      {
        chip_name: "3xc",
        num_played: 25846
      }
    ],
    most_selected: 237,
    most_transferred_in: 586,
    top_element: 681,
    top_element_info: {
      id: 681,
      points: 16
    },
    transfers_made: 8710540,
    most_captained: 233,
    most_vice_captained: 240
  },
  {
    id: 25,
    name: "Gameweek 25",
    deadline_time: "2022-02-12T11:00:00Z",
    average_entry_score: 47,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 1032188,
    deadline_time_epoch: 1644663600,
    deadline_time_game_offset: 0,
    highest_score: 125,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 22431
      },
      {
        chip_name: "freehit",
        num_played: 90456
      },
      {
        chip_name: "wildcard",
        num_played: 218499
      },
      {
        chip_name: "3xc",
        num_played: 80474
      }
    ],
    most_selected: 237,
    most_transferred_in: 681,
    top_element: 255,
    top_element_info: {
      id: 255,
      points: 18
    },
    transfers_made: 8374086,
    most_captained: 233,
    most_vice_captained: 240
  },
  {
    id: 26,
    name: "Gameweek 26",
    deadline_time: "2022-02-19T11:00:00Z",
    average_entry_score: 84,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 3861456,
    deadline_time_epoch: 1645268400,
    deadline_time_game_offset: 0,
    highest_score: 212,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 239806
      },
      {
        chip_name: "freehit",
        num_played: 345118
      },
      {
        chip_name: "wildcard",
        num_played: 263793
      },
      {
        chip_name: "3xc",
        num_played: 1138950
      }
    ],
    most_selected: 233,
    most_transferred_in: 233,
    top_element: 233,
    top_element_info: {
      id: 233,
      points: 28
    },
    transfers_made: 14147393,
    most_captained: 233,
    most_vice_captained: 237
  },
  {
    id: 27,
    name: "Gameweek 27",
    deadline_time: "2022-02-25T18:30:00Z",
    average_entry_score: 40,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 175965,
    deadline_time_epoch: 1645813800,
    deadline_time_game_offset: 0,
    highest_score: 107,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 12063
      },
      {
        chip_name: "freehit",
        num_played: 600180
      },
      {
        chip_name: "wildcard",
        num_played: 144397
      },
      {
        chip_name: "3xc",
        num_played: 21861
      }
    ],
    most_selected: 233,
    most_transferred_in: 700,
    top_element: 360,
    top_element_info: {
      id: 360,
      points: 18
    },
    transfers_made: 14541835,
    most_captained: 233,
    most_vice_captained: 579
  },
  {
    id: 28,
    name: "Gameweek 28",
    deadline_time: "2022-03-05T11:00:00Z",
    average_entry_score: 68,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 9024690,
    deadline_time_epoch: 1646478000,
    deadline_time_game_offset: 0,
    highest_score: 214,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 245918
      },
      {
        chip_name: "freehit",
        num_played: 199886
      },
      {
        chip_name: "wildcard",
        num_played: 300722
      },
      {
        chip_name: "3xc",
        num_played: 51262
      }
    ],
    most_selected: 233,
    most_transferred_in: 127,
    top_element: 44,
    top_element_info: {
      id: 44,
      points: 29
    },
    transfers_made: 12705647,
    most_captained: 233,
    most_vice_captained: 233
  },
  {
    id: 29,
    name: "Gameweek 29",
    deadline_time: "2022-03-12T11:00:00Z",
    average_entry_score: 72,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 1582027,
    deadline_time_epoch: 1647082800,
    deadline_time_game_offset: 0,
    highest_score: 156,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 147057
      },
      {
        chip_name: "freehit",
        num_played: 156853
      },
      {
        chip_name: "wildcard",
        num_played: 212237
      },
      {
        chip_name: "3xc",
        num_played: 421523
      }
    ],
    most_selected: 233,
    most_transferred_in: 22,
    top_element: 224,
    top_element_info: {
      id: 224,
      points: 19
    },
    transfers_made: 11296334,
    most_captained: 233,
    most_vice_captained: 233
  },
  {
    id: 30,
    name: "Gameweek 30",
    deadline_time: "2022-03-18T18:30:00Z",
    average_entry_score: 28,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 8948125,
    deadline_time_epoch: 1647628200,
    deadline_time_game_offset: 0,
    highest_score: 106,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 10295
      },
      {
        chip_name: "freehit",
        num_played: 838206
      },
      {
        chip_name: "wildcard",
        num_played: 103866
      },
      {
        chip_name: "3xc",
        num_played: 11789
      }
    ],
    most_selected: 233,
    most_transferred_in: 78,
    top_element: 359,
    top_element_info: {
      id: 359,
      points: 15
    },
    transfers_made: 15679493,
    most_captained: 233,
    most_vice_captained: 359
  },
  {
    id: 31,
    name: "Gameweek 31",
    deadline_time: "2022-04-02T10:00:00Z",
    average_entry_score: 43,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 2450661,
    deadline_time_epoch: 1648893600,
    deadline_time_game_offset: 0,
    highest_score: 129,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 55086
      },
      {
        chip_name: "freehit",
        num_played: 31496
      },
      {
        chip_name: "wildcard",
        num_played: 113499
      },
      {
        chip_name: "3xc",
        num_played: 48795
      }
    ],
    most_selected: 233,
    most_transferred_in: 700,
    top_element: 180,
    top_element_info: {
      id: 180,
      points: 17
    },
    transfers_made: 6472321,
    most_captained: 233,
    most_vice_captained: 357
  },
  {
    id: 32,
    name: "Gameweek 32",
    deadline_time: "2022-04-08T17:30:00Z",
    average_entry_score: 48,
    finished: true,
    data_checked: true,
    highest_scoring_entry: 2536664,
    deadline_time_epoch: 1649439000,
    deadline_time_game_offset: 0,
    highest_score: 142,
    is_previous: true,
    is_current: false,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 46319
      },
      {
        chip_name: "freehit",
        num_played: 25500
      },
      {
        chip_name: "wildcard",
        num_played: 62546
      },
      {
        chip_name: "3xc",
        num_played: 13959
      }
    ],
    most_selected: 233,
    most_transferred_in: 420,
    top_element: 359,
    top_element_info: {
      id: 359,
      points: 21
    },
    transfers_made: 5190403,
    most_captained: 233,
    most_vice_captained: 233
  },
  {
    id: 33,
    name: "Gameweek 33",
    deadline_time: "2022-04-16T10:00:00Z",
    average_entry_score: 18,
    finished: false,
    data_checked: false,
    highest_scoring_entry: 1077084,
    deadline_time_epoch: 1650103200,
    deadline_time_game_offset: 0,
    highest_score: 104,
    is_previous: false,
    is_current: true,
    is_next: false,
    cup_leagues_created: true,
    h2h_ko_matches_created: true,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 129961
      },
      {
        chip_name: "freehit",
        num_played: 190342
      },
      {
        chip_name: "wildcard",
        num_played: 100879
      },
      {
        chip_name: "3xc",
        num_played: 58689
      }
    ],
    most_selected: 756,
    most_transferred_in: 662,
    top_element: 828,
    top_element_info: {
      id: 828,
      points: 17
    },
    transfers_made: 9395674,
    most_captained: 324,
    most_vice_captained: 9
  },
  {
    id: 34,
    name: "Gameweek 34",
    deadline_time: "2022-04-23T10:00:00Z",
    average_entry_score: 0,
    finished: false,
    data_checked: false,
    highest_scoring_entry: null,
    deadline_time_epoch: 1650708000,
    deadline_time_game_offset: 0,
    highest_score: null,
    is_previous: false,
    is_current: false,
    is_next: true,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [
      {
        chip_name: "bboost",
        num_played: 6404
      },
      {
        chip_name: "freehit",
        num_played: 3424
      },
      {
        chip_name: "wildcard",
        num_played: 11588
      },
      {
        chip_name: "3xc",
        num_played: 4380
      }
    ],
    most_selected: null,
    most_transferred_in: null,
    top_element: null,
    top_element_info: null,
    transfers_made: 578142,
    most_captained: null,
    most_vice_captained: null
  },
  {
    id: 35,
    name: "Gameweek 35",
    deadline_time: "2022-04-30T10:00:00Z",
    average_entry_score: 0,
    finished: false,
    data_checked: false,
    highest_scoring_entry: null,
    deadline_time_epoch: 1651312800,
    deadline_time_game_offset: 0,
    highest_score: null,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [],
    most_selected: null,
    most_transferred_in: null,
    top_element: null,
    top_element_info: null,
    transfers_made: 0,
    most_captained: null,
    most_vice_captained: null
  },
  {
    id: 36,
    name: "Gameweek 36",
    deadline_time: "2022-05-07T12:30:00Z",
    average_entry_score: 0,
    finished: false,
    data_checked: false,
    highest_scoring_entry: null,
    deadline_time_epoch: 1651926600,
    deadline_time_game_offset: 0,
    highest_score: null,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [],
    most_selected: null,
    most_transferred_in: null,
    top_element: null,
    top_element_info: null,
    transfers_made: 0,
    most_captained: null,
    most_vice_captained: null
  },
  {
    id: 37,
    name: "Gameweek 37",
    deadline_time: "2022-05-15T09:30:00Z",
    average_entry_score: 0,
    finished: false,
    data_checked: false,
    highest_scoring_entry: null,
    deadline_time_epoch: 1652607000,
    deadline_time_game_offset: 0,
    highest_score: null,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [],
    most_selected: null,
    most_transferred_in: null,
    top_element: null,
    top_element_info: null,
    transfers_made: 0,
    most_captained: null,
    most_vice_captained: null
  },
  {
    id: 38,
    name: "Gameweek 38",
    deadline_time: "2022-05-22T12:30:00Z",
    average_entry_score: 0,
    finished: false,
    data_checked: false,
    highest_scoring_entry: null,
    deadline_time_epoch: 1653222600,
    deadline_time_game_offset: 0,
    highest_score: null,
    is_previous: false,
    is_current: false,
    is_next: false,
    cup_leagues_created: false,
    h2h_ko_matches_created: false,
    chip_plays: [],
    most_selected: null,
    most_transferred_in: null,
    top_element: null,
    top_element_info: null,
    transfers_made: 0,
    most_captained: null,
    most_vice_captained: null
  }
];

export const mockTeams: Team[] = [
  {
    code: 3,
    draw: 0,
    form: null,
    id: 1,
    loss: 0,
    name: "Arsenal",
    played: 0,
    points: 0,
    position: 0,
    short_name: "ARS",
    strength: 4,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1210,
    strength_overall_away: 1270,
    strength_attack_home: 1150,
    strength_attack_away: 1210,
    strength_defence_home: 1190,
    strength_defence_away: 1220,
    pulse_id: 1
  },
  {
    code: 7,
    draw: 0,
    form: null,
    id: 2,
    loss: 0,
    name: "Aston Villa",
    played: 0,
    points: 0,
    position: 0,
    short_name: "AVL",
    strength: 3,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1130,
    strength_overall_away: 1160,
    strength_attack_home: 1140,
    strength_attack_away: 1110,
    strength_defence_home: 1090,
    strength_defence_away: 1090,
    pulse_id: 2
  },
  {
    code: 94,
    draw: 0,
    form: null,
    id: 3,
    loss: 0,
    name: "Brentford",
    played: 0,
    points: 0,
    position: 0,
    short_name: "BRE",
    strength: 2,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1060,
    strength_overall_away: 1070,
    strength_attack_home: 1120,
    strength_attack_away: 1150,
    strength_defence_home: 1080,
    strength_defence_away: 1120,
    pulse_id: 130
  },
  {
    code: 36,
    draw: 0,
    form: null,
    id: 4,
    loss: 0,
    name: "Brighton",
    played: 0,
    points: 0,
    position: 0,
    short_name: "BHA",
    strength: 3,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1130,
    strength_overall_away: 1130,
    strength_attack_home: 1160,
    strength_attack_away: 1160,
    strength_defence_home: 1100,
    strength_defence_away: 1120,
    pulse_id: 131
  },
  {
    code: 90,
    draw: 0,
    form: null,
    id: 5,
    loss: 0,
    name: "Burnley",
    played: 0,
    points: 0,
    position: 0,
    short_name: "BUR",
    strength: 2,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1060,
    strength_overall_away: 1050,
    strength_attack_home: 1080,
    strength_attack_away: 1130,
    strength_defence_home: 1060,
    strength_defence_away: 1100,
    pulse_id: 43
  },
  {
    code: 8,
    draw: 0,
    form: null,
    id: 6,
    loss: 0,
    name: "Chelsea",
    played: 0,
    points: 0,
    position: 0,
    short_name: "CHE",
    strength: 5,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1320,
    strength_overall_away: 1350,
    strength_attack_home: 1300,
    strength_attack_away: 1300,
    strength_defence_home: 1250,
    strength_defence_away: 1290,
    pulse_id: 4
  },
  {
    code: 31,
    draw: 0,
    form: null,
    id: 7,
    loss: 0,
    name: "Crystal Palace",
    played: 0,
    points: 0,
    position: 0,
    short_name: "CRY",
    strength: 3,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1090,
    strength_overall_away: 1100,
    strength_attack_home: 1110,
    strength_attack_away: 1160,
    strength_defence_home: 1080,
    strength_defence_away: 1160,
    pulse_id: 6
  },
  {
    code: 11,
    draw: 0,
    form: null,
    id: 8,
    loss: 0,
    name: "Everton",
    played: 0,
    points: 0,
    position: 0,
    short_name: "EVE",
    strength: 3,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1090,
    strength_overall_away: 1090,
    strength_attack_home: 1130,
    strength_attack_away: 1090,
    strength_defence_home: 1110,
    strength_defence_away: 1110,
    pulse_id: 7
  },
  {
    code: 13,
    draw: 0,
    form: null,
    id: 9,
    loss: 0,
    name: "Leicester",
    played: 0,
    points: 0,
    position: 0,
    short_name: "LEI",
    strength: 3,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1160,
    strength_overall_away: 1190,
    strength_attack_home: 1100,
    strength_attack_away: 1080,
    strength_defence_home: 1150,
    strength_defence_away: 1160,
    pulse_id: 26
  },
  {
    code: 2,
    draw: 0,
    form: null,
    id: 10,
    loss: 0,
    name: "Leeds",
    played: 0,
    points: 0,
    position: 0,
    short_name: "LEE",
    strength: 3,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1090,
    strength_overall_away: 1100,
    strength_attack_home: 1080,
    strength_attack_away: 1070,
    strength_defence_home: 1100,
    strength_defence_away: 1100,
    pulse_id: 9
  },
  {
    code: 14,
    draw: 0,
    form: null,
    id: 11,
    loss: 0,
    name: "Liverpool",
    played: 0,
    points: 0,
    position: 0,
    short_name: "LIV",
    strength: 5,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1330,
    strength_overall_away: 1350,
    strength_attack_home: 1300,
    strength_attack_away: 1350,
    strength_defence_home: 1340,
    strength_defence_away: 1350,
    pulse_id: 10
  },
  {
    code: 43,
    draw: 0,
    form: null,
    id: 12,
    loss: 0,
    name: "Man City",
    played: 0,
    points: 0,
    position: 0,
    short_name: "MCI",
    strength: 5,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1350,
    strength_overall_away: 1370,
    strength_attack_home: 1340,
    strength_attack_away: 1360,
    strength_defence_home: 1340,
    strength_defence_away: 1360,
    pulse_id: 11
  },
  {
    code: 1,
    draw: 0,
    form: null,
    id: 13,
    loss: 0,
    name: "Man Utd",
    played: 0,
    points: 0,
    position: 0,
    short_name: "MUN",
    strength: 4,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1210,
    strength_overall_away: 1270,
    strength_attack_home: 1170,
    strength_attack_away: 1190,
    strength_defence_home: 1190,
    strength_defence_away: 1200,
    pulse_id: 12
  },
  {
    code: 4,
    draw: 0,
    form: null,
    id: 14,
    loss: 0,
    name: "Newcastle",
    played: 0,
    points: 0,
    position: 0,
    short_name: "NEW",
    strength: 3,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1090,
    strength_overall_away: 1070,
    strength_attack_home: 1050,
    strength_attack_away: 1030,
    strength_defence_home: 1040,
    strength_defence_away: 1070,
    pulse_id: 23
  },
  {
    code: 45,
    draw: 0,
    form: null,
    id: 15,
    loss: 0,
    name: "Norwich",
    played: 0,
    points: 0,
    position: 0,
    short_name: "NOR",
    strength: 2,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1010,
    strength_overall_away: 1030,
    strength_attack_home: 1040,
    strength_attack_away: 1040,
    strength_defence_home: 1040,
    strength_defence_away: 1030,
    pulse_id: 14
  },
  {
    code: 20,
    draw: 0,
    form: null,
    id: 16,
    loss: 0,
    name: "Southampton",
    played: 0,
    points: 0,
    position: 0,
    short_name: "SOU",
    strength: 3,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1090,
    strength_overall_away: 1100,
    strength_attack_home: 1090,
    strength_attack_away: 1140,
    strength_defence_home: 1120,
    strength_defence_away: 1090,
    pulse_id: 20
  },
  {
    code: 6,
    draw: 0,
    form: null,
    id: 17,
    loss: 0,
    name: "Spurs",
    played: 0,
    points: 0,
    position: 0,
    short_name: "TOT",
    strength: 4,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1210,
    strength_overall_away: 1270,
    strength_attack_home: 1190,
    strength_attack_away: 1200,
    strength_defence_home: 1210,
    strength_defence_away: 1210,
    pulse_id: 21
  },
  {
    code: 57,
    draw: 0,
    form: null,
    id: 18,
    loss: 0,
    name: "Watford",
    played: 0,
    points: 0,
    position: 0,
    short_name: "WAT",
    strength: 2,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1050,
    strength_overall_away: 1050,
    strength_attack_home: 1090,
    strength_attack_away: 1040,
    strength_defence_home: 1120,
    strength_defence_away: 1070,
    pulse_id: 33
  },
  {
    code: 21,
    draw: 0,
    form: null,
    id: 19,
    loss: 0,
    name: "West Ham",
    played: 0,
    points: 0,
    position: 0,
    short_name: "WHU",
    strength: 4,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1200,
    strength_overall_away: 1200,
    strength_attack_home: 1110,
    strength_attack_away: 1150,
    strength_defence_home: 1160,
    strength_defence_away: 1180,
    pulse_id: 25
  },
  {
    code: 39,
    draw: 0,
    form: null,
    id: 20,
    loss: 0,
    name: "Wolves",
    played: 0,
    points: 0,
    position: 0,
    short_name: "WOL",
    strength: 4,
    team_division: null,
    unavailable: false,
    win: 0,
    strength_overall_home: 1200,
    strength_overall_away: 1220,
    strength_attack_home: 1150,
    strength_attack_away: 1160,
    strength_defence_home: 1080,
    strength_defence_away: 1100,
    pulse_id: 38
  }
];

export const mockFixtures: Fixture[] = [
  {
    code: 2210271,
    event: 1,
    finished: true,
    finished_provisional: true,
    id: 1,
    kickoff_time: "2021-08-13T19:00:00Z",
    minutes: 90,
    provisional_start_time: false,
    started: true,
    team_a: 1,
    team_a_score: 0,
    team_h: 3,
    team_h_score: 2,
    stats: [
      {
        identifier: "goals_scored",
        a: [],
        h: [
          {
            value: 1,
            element: 77
          },
          {
            value: 1,
            element: 81
          }
        ]
      },
      {
        identifier: "assists",
        a: [],
        h: [
          {
            value: 1,
            element: 91
          }
        ]
      },
      {
        identifier: "own_goals",
        a: [],
        h: []
      },
      {
        identifier: "penalties_saved",
        a: [],
        h: []
      },
      {
        identifier: "penalties_missed",
        a: [],
        h: []
      },
      {
        identifier: "yellow_cards",
        a: [],
        h: []
      },
      {
        identifier: "red_cards",
        a: [],
        h: []
      },
      {
        identifier: "saves",
        a: [
          {
            value: 1,
            element: 1
          }
        ],
        h: [
          {
            value: 4,
            element: 80
          }
        ]
      },
      {
        identifier: "bonus",
        a: [],
        h: [
          {
            value: 3,
            element: 81
          },
          {
            value: 2,
            element: 91
          },
          {
            value: 1,
            element: 80
          }
        ]
      },
      {
        identifier: "bps",
        a: [
          {
            value: 17,
            element: 16
          },
          {
            value: 14,
            element: 8
          },
          {
            value: 14,
            element: 10
          },
          {
            value: 13,
            element: 7
          },
          {
            value: 13,
            element: 21
          },
          {
            value: 13,
            element: 478
          },
          {
            value: 12,
            element: 67
          },
          {
            value: 11,
            element: 1
          },
          {
            value: 9,
            element: 17
          },
          {
            value: 7,
            element: 26
          },
          {
            value: 4,
            element: 22
          },
          {
            value: 4,
            element: 531
          },
          {
            value: -2,
            element: 530
          }
        ],
        h: [
          {
            value: 33,
            element: 81
          },
          {
            value: 32,
            element: 91
          },
          {
            value: 30,
            element: 80
          },
          {
            value: 25,
            element: 77
          },
          {
            value: 23,
            element: 483
          },
          {
            value: 22,
            element: 76
          },
          {
            value: 22,
            element: 83
          },
          {
            value: 9,
            element: 479
          },
          {
            value: 6,
            element: 84
          },
          {
            value: 4,
            element: 78
          },
          {
            value: 4,
            element: 96
          },
          {
            value: 4,
            element: 97
          },
          {
            value: 3,
            element: 90
          },
          {
            value: 1,
            element: 88
          }
        ]
      }
    ],
    team_h_difficulty: 4,
    team_a_difficulty: 2,
    pulse_id: 66342
  },
  {
    code: 2210286,
    event: 2,
    finished: true,
    finished_provisional: true,
    id: 15,
    kickoff_time: "2021-08-21T11:30:00Z",
    minutes: 90,
    provisional_start_time: false,
    started: true,
    team_a: 5,
    team_a_score: 0,
    team_h: 11,
    team_h_score: 2,
    stats: [
      {
        identifier: "goals_scored",
        a: [],
        h: [
          {
            value: 1,
            element: 230
          },
          {
            value: 1,
            element: 240
          }
        ]
      },
      {
        identifier: "assists",
        a: [],
        h: [
          {
            value: 1,
            element: 237
          },
          {
            value: 1,
            element: 245
          }
        ]
      },
      {
        identifier: "own_goals",
        a: [],
        h: []
      },
      {
        identifier: "penalties_saved",
        a: [],
        h: []
      },
      {
        identifier: "penalties_missed",
        a: [],
        h: []
      },
      {
        identifier: "yellow_cards",
        a: [],
        h: []
      },
      {
        identifier: "red_cards",
        a: [],
        h: []
      },
      {
        identifier: "saves",
        a: [
          {
            value: 6,
            element: 112
          }
        ],
        h: [
          {
            value: 3,
            element: 231
          }
        ]
      },
      {
        identifier: "bonus",
        a: [],
        h: [
          {
            value: 3,
            element: 237
          },
          {
            value: 2,
            element: 245
          },
          {
            value: 1,
            element: 231
          }
        ]
      },
      {
        identifier: "bps",
        a: [
          {
            value: 23,
            element: 112
          },
          {
            value: 17,
            element: 118
          },
          {
            value: 14,
            element: 110
          },
          {
            value: 9,
            element: 113
          },
          {
            value: 7,
            element: 98
          },
          {
            value: 7,
            element: 101
          },
          {
            value: 7,
            element: 104
          },
          {
            value: 6,
            element: 106
          },
          {
            value: 6,
            element: 115
          },
          {
            value: 5,
            element: 105
          },
          {
            value: 4,
            element: 108
          },
          {
            value: 3,
            element: 109
          },
          {
            value: 2,
            element: 100
          }
        ],
        h: [
          {
            value: 50,
            element: 237
          },
          {
            value: 41,
            element: 245
          },
          {
            value: 31,
            element: 231
          },
          {
            value: 27,
            element: 229
          },
          {
            value: 26,
            element: 224
          },
          {
            value: 25,
            element: 240
          },
          {
            value: 20,
            element: 230
          },
          {
            value: 13,
            element: 222
          },
          {
            value: 13,
            element: 506
          },
          {
            value: 12,
            element: 239
          },
          {
            value: 5,
            element: 233
          },
          {
            value: 3,
            element: 225
          },
          {
            value: 3,
            element: 228
          },
          {
            value: 3,
            element: 238
          }
        ]
      }
    ],
    team_h_difficulty: 2,
    team_a_difficulty: 5,
    pulse_id: 66357
  },
  {
    code: 2210295,
    event: 3,
    finished: true,
    finished_provisional: true,
    id: 24,
    kickoff_time: "2021-08-28T11:30:00Z",
    minutes: 90,
    provisional_start_time: false,
    started: true,
    team_a: 1,
    team_a_score: 0,
    team_h: 12,
    team_h_score: 5,
    stats: [
      {
        identifier: "goals_scored",
        a: [],
        h: [
          {
            value: 2,
            element: 268
          },
          {
            value: 1,
            element: 250
          },
          {
            value: 1,
            element: 263
          },
          {
            value: 1,
            element: 266
          }
        ]
      },
      {
        identifier: "assists",
        a: [],
        h: [
          {
            value: 1,
            element: 33
          },
          {
            value: 1,
            element: 254
          },
          {
            value: 1,
            element: 261
          },
          {
            value: 1,
            element: 263
          },
          {
            value: 1,
            element: 268
          }
        ]
      },
      {
        identifier: "own_goals",
        a: [],
        h: []
      },
      {
        identifier: "penalties_saved",
        a: [],
        h: []
      },
      {
        identifier: "penalties_missed",
        a: [],
        h: []
      },
      {
        identifier: "yellow_cards",
        a: [
          {
            value: 1,
            element: 5
          },
          {
            value: 1,
            element: 11
          }
        ],
        h: [
          {
            value: 1,
            element: 266
          }
        ]
      },
      {
        identifier: "red_cards",
        a: [
          {
            value: 1,
            element: 7
          }
        ],
        h: []
      },
      {
        identifier: "saves",
        a: [
          {
            value: 5,
            element: 1
          }
        ],
        h: []
      },
      {
        identifier: "bonus",
        a: [],
        h: [
          {
            value: 3,
            element: 263
          },
          {
            value: 2,
            element: 268
          },
          {
            value: 1,
            element: 250
          }
        ]
      },
      {
        identifier: "bps",
        a: [
          {
            value: 20,
            element: 1
          },
          {
            value: 17,
            element: 14
          },
          {
            value: 14,
            element: 16
          },
          {
            value: 13,
            element: 10
          },
          {
            value: 8,
            element: 21
          },
          {
            value: 5,
            element: 558
          },
          {
            value: 3,
            element: 11
          },
          {
            value: 3,
            element: 13
          },
          {
            value: 2,
            element: 12
          },
          {
            value: 1,
            element: 5
          },
          {
            value: -1,
            element: 6
          },
          {
            value: -5,
            element: 7
          }
        ],
        h: [
          {
            value: 53,
            element: 263
          },
          {
            value: 51,
            element: 268
          },
          {
            value: 42,
            element: 250
          },
          {
            value: 36,
            element: 266
          },
          {
            value: 30,
            element: 262
          },
          {
            value: 29,
            element: 254
          },
          {
            value: 28,
            element: 33
          },
          {
            value: 28,
            element: 256
          },
          {
            value: 24,
            element: 257
          },
          {
            value: 23,
            element: 259
          },
          {
            value: 14,
            element: 261
          },
          {
            value: 9,
            element: 264
          },
          {
            value: 5,
            element: 249
          },
          {
            value: -1,
            element: 255
          }
        ]
      }
    ],
    team_h_difficulty: 4,
    team_a_difficulty: 5,
    pulse_id: 66366
  },
  {
    code: 2210301,
    event: 4,
    finished: true,
    finished_provisional: true,
    id: 31,
    kickoff_time: "2021-09-11T14:00:00Z",
    minutes: 90,
    provisional_start_time: false,
    started: true,
    team_a: 15,
    team_a_score: 0,
    team_h: 1,
    team_h_score: 1,
    stats: [
      {
        identifier: "goals_scored",
        a: [],
        h: [
          {
            value: 1,
            element: 4
          }
        ]
      },
      {
        identifier: "assists",
        a: [],
        h: [
          {
            value: 1,
            element: 17
          }
        ]
      },
      {
        identifier: "own_goals",
        a: [],
        h: []
      },
      {
        identifier: "penalties_saved",
        a: [],
        h: []
      },
      {
        identifier: "penalties_missed",
        a: [],
        h: []
      },
      {
        identifier: "yellow_cards",
        a: [
          {
            value: 1,
            element: 319
          },
          {
            value: 1,
            element: 326
          }
        ],
        h: [
          {
            value: 1,
            element: 15
          },
          {
            value: 1,
            element: 67
          }
        ]
      },
      {
        identifier: "red_cards",
        a: [],
        h: []
      },
      {
        identifier: "saves",
        a: [
          {
            value: 5,
            element: 314
          }
        ],
        h: [
          {
            value: 1,
            element: 559
          }
        ]
      },
      {
        identifier: "bonus",
        a: [],
        h: [
          {
            value: 3,
            element: 4
          },
          {
            value: 2,
            element: 23
          },
          {
            value: 1,
            element: 16
          }
        ]
      },
      {
        identifier: "bps",
        a: [
          {
            value: 18,
            element: 314
          },
          {
            value: 16,
            element: 331
          },
          {
            value: 15,
            element: 290
          },
          {
            value: 13,
            element: 319
          },
          {
            value: 13,
            element: 528
          },
          {
            value: 12,
            element: 471
          },
          {
            value: 10,
            element: 317
          },
          {
            value: 9,
            element: 326
          },
          {
            value: 6,
            element: 318
          },
          {
            value: 6,
            element: 323
          },
          {
            value: 5,
            element: 329
          },
          {
            value: 4,
            element: 315
          },
          {
            value: 4,
            element: 325
          },
          {
            value: 3,
            element: 449
          }
        ],
        h: [
          {
            value: 30,
            element: 4
          },
          {
            value: 28,
            element: 23
          },
          {
            value: 24,
            element: 16
          },
          {
            value: 23,
            element: 559
          },
          {
            value: 22,
            element: 17
          },
          {
            value: 21,
            element: 478
          },
          {
            value: 21,
            element: 590
          },
          {
            value: 19,
            element: 67
          },
          {
            value: 18,
            element: 22
          },
          {
            value: 14,
            element: 558
          },
          {
            value: 12,
            element: 13
          },
          {
            value: 5,
            element: 5
          },
          {
            value: 2,
            element: 21
          }
        ]
      }
    ],
    team_h_difficulty: 2,
    team_a_difficulty: 4,
    pulse_id: 66372
  },
  {
    code: 2210316,
    event: 5,
    finished: true,
    finished_provisional: true,
    id: 46,
    kickoff_time: "2021-09-17T19:00:00Z",
    minutes: 90,
    provisional_start_time: false,
    started: true,
    team_a: 10,
    team_a_score: 1,
    team_h: 14,
    team_h_score: 1,
    stats: [
      {
        identifier: "goals_scored",
        a: [
          {
            value: 1,
            element: 196
          }
        ],
        h: [
          {
            value: 1,
            element: 307
          }
        ]
      },
      {
        identifier: "assists",
        a: [
          {
            value: 1,
            element: 189
          }
        ],
        h: [
          {
            value: 1,
            element: 310
          }
        ]
      },
      {
        identifier: "own_goals",
        a: [],
        h: []
      },
      {
        identifier: "penalties_saved",
        a: [],
        h: []
      },
      {
        identifier: "penalties_missed",
        a: [],
        h: []
      },
      {
        identifier: "yellow_cards",
        a: [
          {
            value: 1,
            element: 187
          },
          {
            value: 1,
            element: 463
          }
        ],
        h: [
          {
            value: 1,
            element: 292
          },
          {
            value: 1,
            element: 308
          }
        ]
      },
      {
        identifier: "red_cards",
        a: [],
        h: []
      },
      {
        identifier: "saves",
        a: [
          {
            value: 6,
            element: 199
          }
        ],
        h: [
          {
            value: 9,
            element: 294
          }
        ]
      },
      {
        identifier: "bonus",
        a: [
          {
            value: 1,
            element: 196
          }
        ],
        h: [
          {
            value: 3,
            element: 294
          },
          {
            value: 2,
            element: 307
          }
        ]
      },
      {
        identifier: "bps",
        a: [
          {
            value: 26,
            element: 196
          },
          {
            value: 25,
            element: 199
          },
          {
            value: 19,
            element: 184
          },
          {
            value: 15,
            element: 191
          },
          {
            value: 12,
            element: 185
          },
          {
            value: 12,
            element: 189
          },
          {
            value: 11,
            element: 186
          },
          {
            value: 11,
            element: 188
          },
          {
            value: 9,
            element: 463
          },
          {
            value: 7,
            element: 187
          },
          {
            value: 4,
            element: 193
          },
          {
            value: 4,
            element: 551
          },
          {
            value: 3,
            element: 197
          },
          {
            value: 2,
            element: 287
          }
        ],
        h: [
          {
            value: 29,
            element: 294
          },
          {
            value: 28,
            element: 307
          },
          {
            value: 15,
            element: 302
          },
          {
            value: 13,
            element: 310
          },
          {
            value: 12,
            element: 292
          },
          {
            value: 11,
            element: 306
          },
          {
            value: 10,
            element: 299
          },
          {
            value: 9,
            element: 293
          },
          {
            value: 9,
            element: 308
          },
          {
            value: 8,
            element: 309
          },
          {
            value: 4,
            element: 19
          },
          {
            value: 3,
            element: 303
          },
          {
            value: 3,
            element: 304
          },
          {
            value: 2,
            element: 298
          }
        ]
      }
    ],
    team_h_difficulty: 2,
    team_a_difficulty: 3,
    pulse_id: 66387
  }
];

export const mockPlayerStats: PlayerStat[] = [
  {
    label: "Minutes played",
    name: "minutes"
  },
  {
    label: "Goals scored",
    name: "goals_scored"
  },
  {
    label: "Assists",
    name: "assists"
  },
  {
    label: "Clean sheets",
    name: "clean_sheets"
  },
  {
    label: "Goals conceded",
    name: "goals_conceded"
  },
  {
    label: "Own goals",
    name: "own_goals"
  },
  {
    label: "Penalties saved",
    name: "penalties_saved"
  },
  {
    label: "Penalties missed",
    name: "penalties_missed"
  },
  {
    label: "Yellow cards",
    name: "yellow_cards"
  },
  {
    label: "Red cards",
    name: "red_cards"
  },
  {
    label: "Saves",
    name: "saves"
  },
  {
    label: "Bonus",
    name: "bonus"
  },
  {
    label: "Bonus Points System",
    name: "bps"
  },
  {
    label: "Influence",
    name: "influence"
  },
  {
    label: "Creativity",
    name: "creativity"
  },
  {
    label: "Threat",
    name: "threat"
  },
  {
    label: "ICT Index",
    name: "ict_index"
  }
];

export const mockGameSettings: GameSettings = {
  league_join_private_max: 25,
  league_join_public_max: 5,
  league_max_size_public_classic: 20,
  league_max_size_public_h2h: 16,
  league_max_size_private_h2h: 16,
  league_max_ko_rounds_private_h2h: 3,
  league_prefix_public: "League",
  league_points_h2h_win: 3,
  league_points_h2h_lose: 0,
  league_points_h2h_draw: 1,
  league_ko_first_instead_of_random: false,
  cup_start_event_id: null,
  cup_stop_event_id: null,
  cup_qualifying_method: null,
  cup_type: null,
  squad_squadplay: 11,
  squad_squadsize: 15,
  squad_team_limit: 3,
  squad_total_spend: 1000,
  ui_currency_multiplier: 10,
  ui_use_special_shirts: false,
  ui_special_shirt_exclusions: [],
  stats_form_days: 30,
  sys_vice_captain_enabled: true,
  transfers_cap: 20,
  transfers_sell_on_fee: 0.5,
  league_h2h_tiebreak_stats: ["+goals_scored", "-goals_conceded"],
  timezone: "UTC"
};

export const mockPhases: Phase[] = [
  {
    id: 1,
    name: "Overall",
    start_event: 1,
    stop_event: 38
  },
  {
    id: 2,
    name: "August",
    start_event: 1,
    stop_event: 3
  },
  {
    id: 3,
    name: "September",
    start_event: 4,
    stop_event: 6
  },
  {
    id: 4,
    name: "October",
    start_event: 7,
    stop_event: 10
  },
  {
    id: 5,
    name: "November",
    start_event: 11,
    stop_event: 14
  },
  {
    id: 6,
    name: "December",
    start_event: 15,
    stop_event: 20
  },
  {
    id: 7,
    name: "January",
    start_event: 21,
    stop_event: 23
  },
  {
    id: 8,
    name: "February",
    start_event: 24,
    stop_event: 27
  },
  {
    id: 9,
    name: "March",
    start_event: 28,
    stop_event: 30
  },
  {
    id: 10,
    name: "April",
    start_event: 31,
    stop_event: 35
  },
  {
    id: 11,
    name: "May",
    start_event: 36,
    stop_event: 38
  }
];

export const mockGameData: GameData = {
  events: mockGameweeks,
  game_settings: mockGameSettings,
  phases: mockPhases,
  teams: mockTeams,
  total_players: mockPlayers.length,
  elements: mockPlayers,
  element_stats: mockPlayerStats,
  element_types: mockPositions
};

export const mockAppData: AppData = {
  gameweeks: mockGameweeks,
  gameSettings: mockGameSettings,
  phases: mockPhases,
  teams: mockTeams,
  playerCount: mockPlayers.length,
  players: mockPlayers,
  playerStats: mockPlayerStats,
  positions: mockPositions,
  fixtures: mockFixtures,
  isMobile: false
};
