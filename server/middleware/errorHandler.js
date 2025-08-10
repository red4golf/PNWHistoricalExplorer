function errorHandler(err, req, res, _next) {
  console.error({ message: err.message, stack: err.stack });
  const status = err.status || 500;
  res.status(status).json({ message: err.message || 'Internal Server Error' });
}

module.exports = errorHandler;
