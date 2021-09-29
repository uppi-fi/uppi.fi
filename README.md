# laturi

## Pre-requisities

- Node.js
- Docker

## Installation & running

In project directory, run: 

```sh
# Start postgres
docker-compose up -d

# Start client & server
yarn start
```

## Migrations

- `npm run migrate`
  - Runs any un-executed committed migrations.
- `npm run migrate:watch`
  - Runs any un-executed committed migrations and then runs and watches the current migration, re-running it on any change. For development.
- `npm run migrate:commit`
  - Commits the current migration into the `committed/` folder, resetting the current migration.
- `npm run migrate:uncommit`
  - Moves the latest commit out of the committed migrations folder and back to the current migration (assuming the current migration is empty-ish).
