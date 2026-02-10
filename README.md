# daily-grind-bot

## What it does
Runs a scheduled GitHub Action that ensures a repo exists and writes/updates `daily-log.md` in that repo once per day.

## Setup
1. Create these GitHub repository secrets in **this** repository:
   - `DAILY_GRIND_TOKEN`: a GitHub Personal Access Token with permission to create repos (optional) and write contents
   - `DAILY_GRIND_OWNER`: your GitHub username (or org name)
   - `DAILY_GRIND_REPO`: the repo name to write `daily-log.md` into

2. The workflow is in `.github/workflows/daily.yml`.

## Local run
Set the env vars (see `.env.example`) and run:

```bash
npm run daily
```

