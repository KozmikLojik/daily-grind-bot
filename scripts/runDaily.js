const { createOrUpdateRepo } = require("./createOrUpdateRepo");
const { writeDailyLog } = require("./writeDailyLog");

async function run() {
  const token = process.env.TOKEN;
  if (!token || !String(token).trim()) {
    throw new Error("TOKEN is required to run the daily job.");
  }

  await createOrUpdateRepo();
  const result = await writeDailyLog();
  console.log(JSON.stringify(result));
}

run().catch((err) => {
  console.error(err && err.stack ? err.stack : String(err));
  process.exitCode = 1;
});

