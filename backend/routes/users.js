const express = require('express');
const { celebrate, Joi } = require('celebrate');

const router = express.Router();
const { auth } = require('../middlewares/auth');
const {
  getUsers,
  getCurrentUserInfo,
  getUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

//  получает данные пользователей
router.get('/', getUsers);

//  получает данные залогиненного пользователя
router.get('/me', auth, getCurrentUserInfo);

//  находит пользователя по id
router.get('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }).unknown(true),
}), getUser);

//  обновляет профиль
router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateUserProfile);

//  обновляет аватар
router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(/(https?:\/\/)(w{3}\.)?(((\d{1,3}\.){3}\d{1,3})|((\w-?)+\.(ru|com)))(:\d{2,5})?((\/.+)+)?\/?#?/),
  }).unknown(true),
}), updateUserAvatar);

module.exports = router;
