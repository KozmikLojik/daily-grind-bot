const DEFAULT_API_BASE = "https://api.github.com";

function buildHeaders() {
  const token = process.env.TOKEN;
  if (!token || !String(token).trim()) {
    throw new Error("TOKEN is required to call the GitHub API.");
  }

  return {
    Authorization: `Bearer ${String(token).trim()}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "daily-grind-bot"
  };
}

async function request(method, path, body) {
  const apiBase = DEFAULT_API_BASE;
  const url = `${apiBase}${path.startsWith("/") ? "" : "/"}${path}`;

  const res = await fetch(url, {
    method,
    headers: {
      ...buildHeaders(),
      ...(body ? { "Content-Type": "application/json" } : {})
    },
    body: body ? JSON.stringify(body) : undefined
  });

  const text = await res.text();
  const data = text ? JSON.parse(text) : null;

  if (!res.ok) {
    const msg = data?.message ? `: ${data.message}` : "";
    const e = new Error(`GitHub API ${method} ${path} failed (${res.status})${msg}`);
    e.status = res.status;
    e.data = data;
    throw e;
  }

  return data;
}

module.exports = { request };

