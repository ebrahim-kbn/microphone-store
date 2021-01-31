const sqlite = require("sqlite");
const sqlite3 = require("sqlite3");

async function setup() {
  const db = await sqlite.open({
    filename: "./microphone.sqlite",
    driver: sqlite3.Database,
  });
  await db.migrate({ force: "true" });

  const microphones = await db.all("SELECT * FROM Microphone");
  console.log("all microphones", microphones);
}

setup();
