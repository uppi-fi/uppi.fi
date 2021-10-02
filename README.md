# laturi

## Pre-requisities

- Node.js
- Docker
- Yarn (for workspaces)

## Installation & running

In project directory, run: 

```sh
# Start postgres
docker-compose up -d

# Start client & server
yarn start
```

## Migrations

- `yarn migrate`
  - Runs any un-executed committed migrations.
- `yarn migrate:watch`
  - Runs any un-executed committed migrations and then runs and watches the current migration, re-running it on any change. For development.
- `yarn migrate:commit`
  - Commits the current migration into the `committed/` folder, resetting the current migration.
- `yarn migrate:uncommit`
  - Moves the latest commit out of the committed migrations folder and back to the current migration (assuming the current migration is empty-ish).
