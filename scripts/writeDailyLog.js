const { request } = require("./githubClient");

function toBase64Utf8(s) {
  return Buffer.from(String(s), "utf8").toString("base64");
}

function fromBase64Utf8(b64) {
  return Buffer.from(String(b64), "base64").toString("utf8");
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

async function writeDailyLog() {
  const owner = process.env.GITHUB_USERNAME || "KozmikLojik";
  const repo = process.env.REPO_NAME || "daily-grind-bot";

  const logPath = "daily-log.md";
  const date = todayIsoDate();
  const newLine = `- ${date}\n`;

  let existingSha = null;
  let existingText = "";

  try {
    const existing = await request("GET", `/repos/${owner}/${repo}/contents/${encodeURIComponent(logPath)}`);
    existingSha = existing.sha || null;
    existingText = existing.content ? fromBase64Utf8(existing.content.replace(/\n/g, "")) : "";
  } catch (e) {
    if (e && e.status !== 404) throw e;
  }

  const header = "# Daily Log\n\n";
  const baseText = existingText && existingText.trim() ? existingText : header;

  if (baseText.includes(newLine.trim())) {
    return { owner, repo, path: logPath, updated: false, date };
  }

  const nextText =
    baseText.endsWith("\n") ? `${baseText}${newLine}` : `${baseText}\n${newLine}`;

  await request("PUT", `/repos/${owner}/${repo}/contents/${encodeURIComponent(logPath)}`, {
    message: `daily log ${date}`,
    content: toBase64Utf8(nextText),
    ...(existingSha ? { sha: existingSha } : {})
  });

  return { owner, repo, path: logPath, updated: true, date };
}

module.exports = { writeDailyLog };

