import pkg from "pg";
import dotenv from "dotenv";
import publicIp from "public-ip";

import { GET_IP, SET_IP } from "./db-queries.js";
import { REFRESH_INTERVAL } from "./constants.js";

// get env config
dotenv.config();

const pool = new pkg.Pool({
  connectionString: `postgresql://postgres:${process.env.POSTGRES_PASS}@localhost:5432/home-monitor`,
});

const app = async () => {
  const ip = await publicIp.v4();
  console.log(`[DDNS] Public IPv4: ${ip}`);

  setInterval(async () => {
    const dbClient = await pool.connect();

    try {
      let ipAddressQueryResult;

      try {
        ipAddressQueryResult = await dbClient.query(GET_IP);
      } catch (e) {
        console.error(`[DDNS] Unable to get public IP: ${e.message}`);
        return;
      }

      const currentIp = ipAddressQueryResult.rows[0]?.ddns_ip;
      const iP_id = ipAddressQueryResult.rows[0]?.ddns_id;

      if (ip && currentIp !== ip) {
        console.log("[DDNS] Setting new IP:", ip, new Date(), iP_id);
        try {
          await dbClient.query(SET_IP, [ip, new Date(), iP_id]);
          console.error("[DDNS] Update success!");
        } catch (e) {
          console.error(`[DDNS] Failed to update: ${e.message}`);
        }
      } else {
        console.log("[DDNS] No update, IP is up to date");
      }
    } catch (e) {
      console.error(`[DDNS] DB error: ${e.message}`);
    }

    await dbClient.end();
  }, REFRESH_INTERVAL);

  console.log("[DDNS] App is running");
};

app();
