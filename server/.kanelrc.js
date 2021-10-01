const path = require("path");

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
  },

  preDeleteModelFolder: true,

  modelNominator: (model) => capitalizeFirstLetter(toCamel(model)) + "T",
  fileNominator: (_, originalName) => originalName,
  propertyNominator: (propertyName, model) => toCamel(propertyName),

  customTypeMap: {
    tsvector: "string",
    bpchar: "string",
  },

  schemas: [
    {
      name: "public",
      modelFolder: path.resolve(__dirname, "..", "shared", "types"),
    },
  ],
};
