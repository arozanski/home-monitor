import pkg from "pg";
import dotenv from "dotenv";
import publicIp from "public-ip";

import { GET_IP, SET_IP } from "./db-queries.js";
import { REFRESH_INTERVAL } from "./constants.js";
import { log, error } from "./utils/log.js";

// get env config
dotenv.config();

const pool = new pkg.Pool({
  connectionString: `postgresql://postgres:${process.env.POSTGRES_PASS}@localhost:5432/home-monitor`,
});

const updateIP = async () => {
  const dbClient = await pool.connect();

  try {
    const ip = await publicIp.v4();
    log(`[DDNS] Public IPv4: ${ip}`);
    let ipAddressQueryResult;

    try {
      ipAddressQueryResult = await dbClient.query(GET_IP);
      log("[DDNS] Fetching IP from DB");
    } catch (e) {
      error(`[DDNS] Unable to fetch IP from DB: ${e.message}`);
      return;
    }

    const currentIp = ipAddressQueryResult.rows[0]?.ddns_ip;
    const ip_id = ipAddressQueryResult.rows[0]?.ddns_id;

    if (ip && currentIp !== ip) {
      log(`[DDNS] Setting new IP:${ip} with id ${ip_id}`);
      try {
        await dbClient.query(SET_IP, [ip, new Date(), ip_id]);
        log("[DDNS] Update success!");
      } catch (e) {
        error(`[DDNS] Failed to update: ${e.message}`);
      }
    } else {
      log("[DDNS] No update, IP is up to date");
    }
  } catch (e) {
    error(`[DDNS] Unable to get public IP: ${e.message}`);
  }

  await dbClient.end();
};

const app = () => {
  setInterval(updateIP, REFRESH_INTERVAL);
  log("[DDNS] App is running");
  updateIP();
};

app();
