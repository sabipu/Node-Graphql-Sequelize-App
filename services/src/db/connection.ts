import { Sequelize } from "sequelize-typescript";
import accessEnv from "#root/helpers/accessEnv";
import models from "./models";

const DB_URL = accessEnv("DB_URL");

const sequelize = new Sequelize(DB_URL, {
  dialectOptions: {
    charset: "utf8",
    multipleStatements: true,
    timezone: '+08:00'
  },
  logging: false,
  timezone: '+08:00',
  models
});

export default sequelize;