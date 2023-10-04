const middleware = require("swagger-express-middleware");
const path = require("path");
// const errorHandler = require("../api/middlewares/errorHandler");

const swagger = (app, routes) => {
  return new Promise((resolve, reject) => {
    middleware(path.join(__dirname, "api.v1.yml"), app, (err, mw) => {
      if (err) {
        return reject(err);
      }
      app.enable("case sensitive routing");
      app.enable("strict routing");

      app.use(mw.metadata());
      app.use(
        mw.files(
          {
            caseSensitive: false,
            strict: false,
          },
          {
            useBasePath: false,
            apiPath: process.env.SWAGGER_API_SPEC,
          }
        )
      );
      app.use(
        mw.parseRequest({
          cookie: {
            secret: "",
          },
          json: {
            limit: "",
          },
        })
      );
      app.use(mw.CORS(), mw.validateRequest());

      routes(app);
      // app.use(errorHandler);
      return resolve();
    });
  });
};

module.exports = swagger;
