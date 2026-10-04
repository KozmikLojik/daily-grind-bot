# daily-grind-bot

A scheduled GitHub Action that adds one dated entry to `daily-log.md` in the configured repository. Re-running the job on the same day is idempotent.

## Configure the workflow

Add a repository secret named `TOKEN` containing a GitHub token that can read the target repository and write its contents. Set the `GITHUB_USERNAME` and `REPO_NAME` variables in the workflow if you want to update a repository other than `KozmikLojik/daily-grind-bot`.

The workflow runs daily at 00:00 UTC. You can also start it from the Actions tab with **Run workflow**.

## Run locally

Requires Node.js 20 or later.

```bash
cp .env.example .env
# Edit .env and set TOKEN
npm run daily
```

On PowerShell, copy `.env.example` to `.env` manually, then set the same values in your shell before running `npm run daily`.
