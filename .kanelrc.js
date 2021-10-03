const path = require('path');
const pluralize = require('pluralize');
const fs = require('fs');

// Quick hack, couldn't get env working here
const getDatabaseUrl = () => {
  const envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf-8');
  const lines = envFile.split('\n');
  const dbLine = lines
    .find((l) => l.includes('DATABASE_URL'))
    .split('=')[1]
    ?.replace(/"/g, '');
  return dbLine.trim();
};

const capitalizeFirstLetter = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const toCamel = (s, capitalize) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

module.exports = {
  connection: {
    connectionString: getDatabaseUrl(),
  },

  preDeleteModelFolder: true,

  modelNominator: (model) =>
    capitalizeFirstLetter(toCamel(pluralize.singular(model))) + 'T',
  fileNominator: (_, originalName) => originalName,
  propertyNominator: (propertyName, model) => toCamel(propertyName),

  customTypeMap: {
    tsvector: 'string',
    bpchar: 'string',
  },

  schemas: [
    {
      name: 'public',
      modelFolder: path.resolve(__dirname, 'shared/schema'),
    },
  ],
};
