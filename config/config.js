require("dotenv").config();
const env = {
  jwtSec: process.env.JWT_SECRET,
  baseUrl: process.env.BASE_URL,
};

module.exports = env;