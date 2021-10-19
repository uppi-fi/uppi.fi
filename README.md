# uppim.me &middot; [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Uppim.me is a **fast** and **easy to use** file uploader.

## Requirements

- Node.js
- Yarn (npm should work too with minimal changes)
- Docker (or your own PostgreSQL database)

## Installation & running

1. Start postgres:

   ```sh
   docker-compose up -d
   ```

2. Install npm packages:
   ```
   yarn
   ```
3. Start app:

   ```
   yarn dev

   # or run separately

   yarn dev:frontend   # Starts frontend
   yarn dev:backend    # Starts backend
   yarn dev:bot        # Starts telegram bot
   yarn migrate:watch  # Starts watching `current.sql` changes

   # or run in production

   yarn build
   yarn start
   ```

## Environment variables and configuration

See `shared/env.ts`. You can add the environment variables to `.env` file, where they get loaded to environment variables.

## Ports used

| Port | Service   | Development link      | Development script |
| ---- | --------- | --------------------- | ------------------ |
| 3005 | Frontend  | http://localhost:3005 | yarn dev:frontend  |
| 8000 | Backend   | http://localhost:8000 | yarn dev:backend   |
| 6006 | Storybook | http://localhost:6006 | yarn storybook     |

### WSL troubleshooting

Port-forwarding does not seem to always work with WSL, there are two scripts in `scripts/` directory that should help if there is some issues:

- `wsl-port-forwards.cmd` - Enables port-forwarding through `netsh`
- `disable-wsl-port-forwards.cmd` - Disables all port-forwards

## Migrations

- `yarn migrate`
  Runs any un-executed committed migrations.
- `yarn migrate:watch`
  Runs any un-executed committed migrations and then runs and watches the current migration, re-running it on any change. For development.
- `yarn migrate:commit`
  Commits the current migration into the `committed/` folder, resetting the current migration.
- `yarn migrate:uncommit`
  Moves the latest commit out of the committed migrations folder and back to the current migration (assuming the current migration is empty-ish).

## License

This repository is MIT licensed.
