# Home Monitor

## What is it?

too lazy to explain this atm.

## Tech stack

- Client: ReactJS/TypeScript, Redux (state), Styled Components + Material UI - Web dashboard displaying all fancy stuff
- Database: PostgreSQL
- Server: DDNS Service - Node.js - this little service is using Google DDNS service to keep track of the server public IP changing now and then. It is stored in DB for future reference and to avoid unnecessary updates to Google DDNS.

## Config

### DDNS

- create `.env` file in the service root and update the `secrets`:

```
POSTGRES_PASS = dummy password;
GOOGLE_DOMAIN_USERNAME = username assigned to the host name in the Google DDNS
GOOGLE_DOMAIN_PASSWORD = password generated to the username for host name in the Google DDNS
GOOGLE_DOMAIN_NAME = Google DDNS host name
```

### Ports:

Client:

- Web `3000`

Server:

- App `3010`

Database:

- Postgres DB `5432`
