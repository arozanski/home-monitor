export const GET_IP =
  "SELECT * FROM public.ddns_ip ORDER BY ddns_timestamp DESC LIMIT 1";
export const SET_IP =
  "UPDATE public.ddns_ip SET ddns_ip = $1, ddns_timestamp = $2 WHERE ddns_id = $3";
