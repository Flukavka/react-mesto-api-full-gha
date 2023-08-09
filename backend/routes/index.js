const express = require('express');
const { errors } = require('celebrate');
const routesUsers = require('./users');
const routesCards = require('./cards');
const routesLogin = require('./login');
const { auth } = require('../middlewares/auth');
const routesCreateUser = require('./createUser');
const NotFoundError = require('../errors/not_found_error');
const { errorLogger } = require('../middlewares/logger');

const routes = express.Router();

routes.use(express.json());

routes.use('/users', auth, routesUsers);
routes.use('/cards', auth, routesCards);
routes.use('/signup', routesCreateUser);
routes.use('/signin', routesLogin);

routes.use('*', (_req, _res, next) => next(new NotFoundError('Страница не найдена')));

// подключаем логгер ошибок
// нужно подключить после обработчиков роутов и до обработчиков ошибок
routes.use(errorLogger);

routes.use(errors());

module.exports = routes;
