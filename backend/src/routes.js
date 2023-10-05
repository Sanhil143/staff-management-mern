const organisationRouter = require('./api/controllers/organisation/router')
const employeeRouter = require("./api/controllers/employee/router");

const routes = (app) => {
  app.use("/api/v1/organisation", organisationRouter);
  app.use("/api/v1/user", employeeRouter);
};

module.exports = routes;