# Uppim.me

## Requirements

- Node.js
- Yarn (npm should work too with minimal changes)
- Docker (or your own PostgreSQL database)

## Installation & running

1. Copy `.env.example` to `.env` and update it if needed

2. Load environment variables:

   ```sh
   chmod +x scripts/set-env.sh
   source scripts/set-env.sh
   ```

3. Start postgres:

   ```sh
   docker-compose up -d
   ```

4. Install npm packages
   ```
   yarn
   ```
5. Start app
   ```
   yarn build
   yarn start
   ```

## Development

Steps above but instead yarn build & start:

```
yarn dev
```
or individually:
```sh
yarn dev:frontend   # Starts frontend
yarn dev:backend    # Starts backend
yarn dev:bot        # Starts telegram bot
yarn migrate:watch  # Starts watching `current.sql` changes
```

## Ports used

- `3005` - Frontend
- `5433` - PostgreSQL
- `8000` - Express backend

### WSL troubleshooting

Port-forwarding does not seem to always work with WSL, there are two scripts in `scripts/` directory that should help if there is some issues:

- `wsl-port-forwards.cmd` - Enables port-forwarding through `netsh`
- `disable-wsl-port-forwards.cmd` - Disables all port-forwards

## Migrations

- `yarn migrate`
  - Runs any un-executed committed migrations.
- `yarn migrate:watch`
  - Runs any un-executed committed migrations and then runs and watches the current migration, re-running it on any change. For development.
- `yarn migrate:commit`
  - Commits the current migration into the `committed/` folder, resetting the current migration.
- `yarn migrate:uncommit`
  - Moves the latest commit out of the committed migrations folder and back to the current migration (assuming the current migration is empty-ish).
