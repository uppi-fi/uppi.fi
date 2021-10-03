# laturi

## Pre-requisities

- Node.js
- Yarn
- Docker (or your own PostgreSQL database)

## Installation & running

1. Load environment variables:
    ```sh
    chmod +x scripts/set_env.sh
    source scripts/set_env.sh
    ```

2. Start postgres:
    ```sh
    docker-compose up -d
    ```

3. Install npm packages
    ```
    yarn
    ```
3. Start app
    ```
    yarn start
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

## Migrations

- `yarn migrate`
  - Runs any un-executed committed migrations.
- `yarn migrate:watch`
  - Runs any un-executed committed migrations and then runs and watches the current migration, re-running it on any change. For development.
- `yarn migrate:commit`
  - Commits the current migration into the `committed/` folder, resetting the current migration.
- `yarn migrate:uncommit`
  - Moves the latest commit out of the committed migrations folder and back to the current migration (assuming the current migration is empty-ish).
