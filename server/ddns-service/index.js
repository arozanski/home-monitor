import { REFRESH_INTERVAL } from "./constants.js";
import { log } from "./utils/log.js";
import { updateIP } from "./db/requests.js";

const app = () => {
  setInterval(updateIP, REFRESH_INTERVAL);
  log("[DDNS] App is running");
  updateIP();
};

app();
