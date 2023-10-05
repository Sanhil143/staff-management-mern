const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500);
  res.send(`<h1>${err.status || 500} Error</h1>` + `<pre>${err.message}</pre>`);
};

module.exports.errorHandler = errorHandler;
