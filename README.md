# FPL Zone

FPL Zone is the latest companion app available to [Fantasy Premier League](https://fantasy.premierleague.com/) (FPL) managers which enables them to make informed decisions each gameweek. The app offers a range of tools such as live gameweek updates, 'my team' analysis, fixture difficulty rating tables, and a player comparison tool. FPL Zone is a TypeScript-based React app, with its data being fetched from a public API provided by the Premier League. With well-tested functionality and eye-catching design, FPL Zone is an essential tool for any FPL manager looking to gain an advantage over their rivals.

# Features

- User accounts for storing personal data (including FPL ID for analysing your FPL teams performances).
- Dream Team: view a lineup of the top performing players of the current gameweek.
- Gameweek Summary: view a summary of statistics from the current gameweek such star player, most captained, most transferred in player etc.
- Team: displays your FPL teams points tally from the current gameweek with a breakdown of each players individual performance.
- FDR: fixture difficulty rating table which gives you a look at the upcoming fixtures for each player/team.
- Results: take a look at the results of matches from the season. Clicking into a result summarises the events of the match.
- Comparison: a tool which allows you to select multiple players from FPL and compare their overall performances across the season.

# Technologies

- React
- Typescript
- Material UI
- React Testing Library
- react-hook-form
- Firebase
- eslint

All of the FPL related data displayed in FPL Zone is fetched from the Premier League's official FPL API.
The Premier League does not provide any official documentation for this API, but the available endpoints can be viewed [here](https://cheatography.com/sertalpbilal/cheat-sheets/fpl-api-endpoints/).

# Usage

```
# Clone the repository:
$ git clone https://github.com/TonyN96/fpl-zone.git

# Go into the repository
$ cd european-stadiums

# Install dependencies
$ npm install
```

Insert your Firebase credentials as environment variables in `.env_sample`.
Rename `.env_sample` to `.env`

```
# Run the proxy server for bypassing CORS
$ npm run proxy

# Run the app
$ npm start
```

![screenshot](/public/assets/images/screenshot.png)
