const express = require('express');
const { errors } = require('celebrate');
const routesUsers = require('./users');
const routesCards = require('./cards');
const routesLogin = require('./login');
const { auth } = require('../middlewares/auth');
const routesCreateUser = require('./createUser');
const NotFoundError = require('../errors/not_found_error');

const routes = express.Router();

routes.use(express.json()); // перенести в app

routes.use('/users', auth, routesUsers);
routes.use('/cards', auth, routesCards);
routes.use('/signup', routesCreateUser);
routes.use('/signin', routesLogin);

routes.use('*', (_req, _res, next) => next(new NotFoundError('Страница не найдена')));

routes.use(errors()); // перенести в app

module.exports = routes;
