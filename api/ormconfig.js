require('dotenv').config();

/** @type {import('typeorm').ConnectionOptions} */
module.exports = {
  type: process.env.DB_CONNECTION,
  database: process.env.DB_DATABASE,
  entities: ['src/entities/**/*{.ts,.js}'],
  logging: false,
  synchronize: true
};
