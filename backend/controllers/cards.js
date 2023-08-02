const Card = require('../models/card');
const NotFoundError = require('../errors/not_found_error');
const ForbiddenStatus = require('../errors/forbidden_status');
const {
  OK_STATUS,
  CREATED_SUCCESS_STATUS,
} = require('../utils/constants');

module.exports.getCards = (_req, res, next) => {
  Card.find({})
    .then((cards) => res.status(OK_STATUS).send(cards))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  return Card.create({ name, link, owner })
    .then((card) => res.status(CREATED_SUCCESS_STATUS).send(card))
    .catch((err) => {
      next(err);
    })
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => Card.findById(req.params.cardId)
  // eslint-disable-next-line consistent-return
  .then((card) => {
    if (!card) {
      next(new NotFoundError('Нет карточки с таким id'));
    } else if (card.owner.toString() === req.user._id) {
      return Card.deleteOne(card).then(() => res.status(OK_STATUS).send(card));
    }

    next(new ForbiddenStatus('Отказано в доступе'));
  })
  .catch((err) => {
    next(err);
  })
  .catch(next);

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
  { new: true },
)
  // eslint-disable-next-line consistent-return
  .then((card) => {
    if (card) {
      return res.status(OK_STATUS).send(card);
    }

    return next(new NotFoundError('Нет карточки с таким id'));
  })
  .catch((err) => {
    next(err);
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true },
)
  // eslint-disable-next-line consistent-return
  .then((card) => {
    if (card) {
      return res.status(OK_STATUS).send(card);
    }

    return next(new NotFoundError('Нет карточки с таким id'));
  })
  .catch((err) => {
    next(err);
  });
