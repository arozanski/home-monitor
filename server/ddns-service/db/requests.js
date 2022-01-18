import publicIp from "public-ip";

import { GET_IP, SET_IP } from "./queries.js";
import { pool } from "./connection.js";
import { log, error } from "../utils/log.js";

export const updateIP = async () => {
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
      log(`[DDNS] Setting new IP:${ip} with id ${ip_id} into DB`);
      try {
        await dbClient.query(SET_IP, [ip, new Date(), ip_id]);
        log("[DDNS] DB IP update success!");
      } catch (e) {
        error(`[DDNS] Failed to update IP: ${e.message}`);
      }
    } else {
      log("[DDNS] No update, IP is up to date");
    }
  } catch (e) {
    error(`[DDNS] Unable to get public IP: ${e.message}`);
  }

  await dbClient.end();
};

const syncIP = (ip) => {};
