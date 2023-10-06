# staff-management-mern

import Express from 'express';
import cookieParser from 'cookie-parser';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import l from './logger';
import oas from './swagger';
import cors from 'cors';

const app = new Express();

function configureExpressApp() {
  const root = path.normalize(`${__dirname}/../..`);

  app.use(bodyParser.json({ limit: process.env.REQUEST_LIMIT || '100kb' }));
  app.use(
    bodyParser.urlencoded({
      extended: true,
      limit: process.env.REQUEST_LIMIT || '100kb',
    })
  );
  app.use(bodyParser.text({ limit: process.env.REQUEST_LIMIT || '100kb' }));
  app.use(cookieParser(process.env.SESSION_SECRET));
  app.use(Express.static(`${root}/public`));
  app.use(cors());
}

function setupRoutes(routes) {
  oas(app, routes)
    .then(() => {
      const port = process.env.PORT;
      const welcome = () =>
        l.info(
          `up and running in ${
            process.env.NODE_ENV || 'development'
          } @: ${os.hostname()} on port: ${port}`
        );

      http.createServer(app).listen(port, welcome);
    })
    .catch((e) => {
      l.error(e);
      // eslint-disable-next-line, no-process-exit
      process.exit(1);
    });
}

export { configureExpressApp, setupRoutes };
