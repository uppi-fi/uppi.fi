require('dotenv').config();

const path = require('path');
const pluralize = require('pluralize');
const { processDatabase } = require('kanel');

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
    connectionString:
      process.env.DATABASE_URL ??
      'postgres://postgres:postgres@localhost:5433/uppi',
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
