require('./common/env');
const { setupExpressServer, startExpressServer } = require('../src/common/server');
const routes = require('../src/routes');

const app = setupExpressServer();
startExpressServer(routes, process.env.PORT);
