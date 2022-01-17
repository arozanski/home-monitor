const express = require("express");
const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  connectionString: `postgresql://postgres:${process.env.PROGRESS_PASS}@localhost:5432/home-monitor`,
});

const init = () => {
  const app = express();
  console.log("process", process.env);
  app.get("/", async (req, res) => {
    const dbClient = await pool.connect();

    try {
      const ipAddress = await dbClient.query("SELECT * FROM public.ddns_ip");

      res
        .json({
          status: "OK",
          data: ipAddress.rows[0],
        })
        .end();
    } catch (e) {
      console.error(`[DDNS] DB error: ${e.message}`);
      res
        .json({
          status: `DB error: ${e.message}`,
        })
        .end();
    }

    await dbClient.end();
  });

  const PORT = 3010;
  app.listen(PORT);

  console.log(`[DDNS] App running on http://localhost:${PORT}`);
};

init();
