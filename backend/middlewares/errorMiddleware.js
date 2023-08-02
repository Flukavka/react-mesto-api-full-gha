// eslint-disable-next-line consistent-return
module.exports.errorMiddleware = (err, _req, res, next) => {
  const statusCode = err.statusCode || 500;

  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;
  res.status(statusCode).send({ message });
  next();
};
