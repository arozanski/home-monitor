# Home Monitor

## What is it?

## Tech stack

- Client: ReactJS/TypeScript, Redux (state), Styled Components + Material UI
- Server: DDNS Service - Node.js

## Config

### DDNS - create `.env` file in service root and update the `secrets`:

```
POSTGRES_PASS = "dummy password";
```

### Ports:

Client:

- Web `3000`

Server:

- DDNS `3010`
- App `3020`

Database:

- postgress `5432`
