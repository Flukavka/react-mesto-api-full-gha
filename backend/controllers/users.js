const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const BadRequestError = require('../errors/bad_request_error');
const ConflictError = require('../errors/conflict_error');
const NotFoundError = require('../errors/not_found_error');
const {
  OK_STATUS,
  CREATED_SUCCESS_STATUS,
} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      ...req.body,
      password: hash,
    }))
    .then((user) => {
      res.status(CREATED_SUCCESS_STATUS).send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Ошибка валидации'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с такой почтой уже существует'));
      } else {
        next(err);
      }
    });
};

// отрбатывает при запросе /signin, возвращает в ответ токен
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        'some-secret-key',
        { expiresIn: '7d' },
      );

      return res.status(OK_STATUS).send({ token, user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Ошибка валидации'));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUserInfo = (req, res, next) => {
  const id = req.user._id;

  User.findById(id)
    // eslint-disable-next-line consistent-return
    .then((user) => {
      if (user) {
        return res.status(OK_STATUS).send(user);
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUsers = (_req, res, next) => User.find({})
  .then((users) => res.status(OK_STATUS).send(users))
  .catch((err) => {
    next(err);
  });

module.exports.getUser = (req, res, next) => {
  const { id } = req.params;

  User.findById(id)
    .then((user) => {
      if (user) {
        return res.status(OK_STATUS).send(user);
      }

      return next(new NotFoundError('Нет пользователя с таким id'));
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUserProfile = (req, res, next) => {
  const { name, about } = req.body;
  const id = req.user._id;

  User
    .findByIdAndUpdate(
      id,
      { name, about },
      { returnDocument: 'after', runValidators: true, new: true },
    )
    .then((user) => {
      if (user) {
        res.status(OK_STATUS).send({
          name,
          about,
          avatar: user.avatar,
          _id: user._id,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { avatar },
    { returnDocument: 'after', runValidators: true, new: true },
  )
    .then((user) => {
      if (user) {
        res.status(OK_STATUS).send({
          name: user.name,
          about: user.about,
          avatar,
          _id: user._id,
        });
      }
    })
    .catch((err) => {
      next(err);
    });
};
