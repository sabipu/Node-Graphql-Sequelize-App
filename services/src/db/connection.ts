import { Sequelize } from "sequelize-typescript";
import accessEnv from "#root/helpers/accessEnv";
import models from "./models";

const DB_NAME = accessEnv("DB_NAME");
const DB_USERNAME = accessEnv("DB_USERNAME");
const DB_PASSWORD = accessEnv("DB_PASSWORD");
const DB_HOST = accessEnv("DB_HOST");

const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialectOptions: {
    charset: "utf8",
    multipleStatements: true,
    timezone: '+08:00'
  },
  dialect: 'mysql',
  // turn this on if you want to see mysql query on console
  // logging: false,
  timezone: '+08:00',
  models
});

export default sequelize;