const express = require('express');
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');
const {
  getUsers,
  getCurrentUserInfo,
  getUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');
const { REG_EXP_LINK } = require('../utils/constants');

const router = express.Router();

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
    avatar: Joi.string().pattern(REG_EXP_LINK),
  }).unknown(true),
}), updateUserAvatar);

module.exports = router;
