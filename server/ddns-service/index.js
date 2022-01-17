import express from "express";
import pkg from "pg";
import dotenv from "dotenv";
import publicIp from "public-ip";

// get env config
dotenv.config();

const pool = new pkg.Pool({
  connectionString: `postgresql://postgres:${process.env.POSTGRES_PASS}@localhost:5432/home-monitor`,
});

const init = async () => {
  const app = express();
  const ipv4 = await publicIp.v4();
  console.log(`[DDNS] public IPv4: ${ipv4}`);

  app.get("/", async (req, res) => {
    const dbClient = await pool.connect();

    try {
      const ipAddress = await dbClient.query(
        "SELECT * FROM public.ddns_ip FETCH FIRST ROW ONLY"
      );

      res
        .json({
          status: "OK",
          data: ipAddress.rows.pop(),
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
