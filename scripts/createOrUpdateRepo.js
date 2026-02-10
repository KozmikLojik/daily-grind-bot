const { request } = require("./githubClient");

async function createOrUpdateRepo() {
  const owner = process.env.GITHUB_USERNAME || "KozmikLojik";
  const repo = process.env.REPO_NAME || "daily-grind-bot";

  try {
    await request("GET", `/repos/${owner}/${repo}`);
    return { owner, repo, created: false };
  } catch (e) {
    if (e && e.status !== 404) throw e;
  }

  // Minimal create flow (personal account). If the token cannot create repos, this will fail.
  await request("POST", "/user/repos", {
    name: repo,
    private: true,
    auto_init: true
  });

  return { owner, repo, created: true };
}

module.exports = { createOrUpdateRepo };

