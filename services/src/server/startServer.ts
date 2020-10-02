import * as express from "express";
import * as cors from "cors";
import * as bodyParser from 'body-parser';
import { router } from '#root/routes';

import accessEnv from "#root/helpers/accessEnv";

const app = express();
const PORT = accessEnv("PORT", 7000);

app.use(
  cors({
    origin: (origin, cb) => cb(null, true),
    credentials: true,
    preflightContinue: true,
    exposedHeaders: [
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin, Origin, X-Requested-With, Content-Type, Accept",
      "X-Password-Expired"
    ],
    optionsSuccessStatus: 200
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(router);

app.listen(PORT, () => {
  console.log(`Node Service listening to ${PORT}`);
})