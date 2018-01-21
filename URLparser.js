const dbURL = process.env.CLEARDB_DATABASE_URL || require("./databaseURL").URL;

module.exports.dbInfo = {
  user: dbURL.split("//")[1].split(":")[0],
  password: dbURL
    .split("//")[1]
    .split(":")[1]
    .split("@")[0],
  host: dbURL
    .split("//")[1]
    .split(":")[1]
    .split("@")[1]
    .split("/")[0],
  database: dbURL
    .split("//")[1]
    .split(":")[1]
    .split("@")[1]
    .split("/")[1]
    .split("?")[0],
};
