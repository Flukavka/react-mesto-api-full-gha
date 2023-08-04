const express = require('express');
const cors = require('cors');
//  const { errors } = require('celebrate');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routes = require('./routes/index');

const { PORT = 4000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

// подключаемся к БД
mongoose.connect(DB_URL);

//  запускаем приложение
const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// https://www.npmjs.com/package/express-rate-limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(helmet());

app.use(limiter);

//  routes.use(express.json());

// подключаем логгер запросов
app.use(requestLogger);

app.use('/', routes);

// подключаем логгер ошибок
// нужно подключить после обработчиков роутов и до обработчиков ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
//  routes.use(errors());

routes.use(errorMiddleware);

//  слушаем ПОРТ для подключения
app.listen(PORT, () => {
  // eslint-disable-next-line
  console.log(`App listening ${PORT}`);
});
