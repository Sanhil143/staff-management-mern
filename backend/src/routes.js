const organisationRouter = require('./api/controllers/organisation/router')
const adminRouter = require('./api/controllers/admin/router')
const authRouter = require('./api/controllers/auth/router')
const employeeRouter = require('./api/controllers/employee/router')

const routes = (app) => {
  app.use("/api/v1/organisation", organisationRouter);
  app.use("/api/v1/admin", adminRouter);
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/employee", employeeRouter);
};

module.exports = routes; 