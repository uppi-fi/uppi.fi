const path = require("path");
const pluralize = require("pluralize");

const capitalizeFirstLetter = (s) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const toCamel = (s, capitalize) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace("-", "").replace("_", "");
  });
};

module.exports = {
  connection: {
    host: "localhost",
    user: "postgres",
    password: "postgres",
    database: "laturi",
    port: 5433,
  },

  preDeleteModelFolder: true,

  modelNominator: (model) =>
    capitalizeFirstLetter(toCamel(pluralize.singular(model))) + "T",
  fileNominator: (_, originalName) => originalName,
  propertyNominator: (propertyName, model) => toCamel(propertyName),

  customTypeMap: {
    tsvector: "string",
    bpchar: "string",
  },

  schemas: [
    {
      name: "public",
      modelFolder: path.resolve(__dirname, "../client/src/schema"),
    },
    {
      name: "public",
      modelFolder: path.resolve(__dirname, "../server/src/schema"),
    },
  ],
};
