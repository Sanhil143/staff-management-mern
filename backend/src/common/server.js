const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const http = require("http");
const cors = require("cors");
const logger = require('../common/logger');
const swagger = require("../common/swagger");
const dbConnection = require("./dbConnection");

const app = express();

const setupExpressServer = () => {
  const root = path.normalize(`${__dirname}/../..`);

  app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || "100kb" }));
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: process.env.REQUEST_LIMIT || "100kb",
    })
  );
  app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || "100kb" }));
  app.use(cookieParser(process.env.SESSION_SECRET));
  app.use(express.static(`${root}/public`));
  app.use(cors());
  // app.use(jwtTokenAuth);

  return app;
};

dbConnection()

const startExpressServer = (routes, port = process.env.PORT) => {
  const welcome = (p) => () =>
    logger.info(
      `up and running in ${
        process.env.NODE_ENV || "development"
      } @: ${os.hostname()} on port: ${p}}`.bgBlack.blue.bold
    );

  swagger(app, routes)
    .then(() => {
      http.createServer(app).listen(port, welcome(port));
    })
    .catch((e) => {
      logger.error(e);
      // eslint-disable-next-line, no-process-exit
      process.exit(1);
    });

  return app;
};

module.exports = { setupExpressServer, startExpressServer };
