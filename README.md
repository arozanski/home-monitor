# Home Monitor

## What is it?

## Tech stack

- Client: ReactJS/TypeScript, Redux (state), Styled Components + Material UI
- Server: DDNS Service - Node.js

## Config

### DDNS - create `.env` file in service root and update the `secrets`:

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

- postgress `5432`
