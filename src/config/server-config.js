require("dotenv").config();

const ServerConfig = {
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
};

module.exports = ServerConfig;
