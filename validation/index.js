const { celebrate, Joi } = require('celebrate');

const headers = Joi.object().keys({
  authorization: Joi.string().required(),
}).unknown(true);

const getValidation = celebrate({
  headers,
});
const getUserValidation = celebrate({
  headers,
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24).required(),
  }),
});
const updateUserValidation = celebrate({
  headers,
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});
const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});
const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});
const createMovieValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    image: Joi.string().pattern(/^https?:\/\/(www\.)?\S+\.[a-z]\/?\??\S+/i),
    trailer: Joi.string().pattern(/^https?:\/\/(www\.)?\S+\.[a-z]\/?\??\S+/i),
    thumbnail: Joi.string().pattern(/^https?:\/\/(www\.)?\S+\.[a-z]\/?\??\S+/i),
    nameRU:Joi.string().required(),
    nameEN:Joi.string().required()
  }),
})
const changeMovieValidation = celebrate({
  headers,
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).required(),
  }),
});

const linkValidator = (v) => {
  const linkRegex = /^https?:\/\/(www\.)?\S+\.[a-z]\/?\??\S+/i;
  return linkRegex.test(v);
};
const emailValidator = (v) => {
  const emailRegex = /^(?=.{1,254}$)(?=.{1,64}@)[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+(\.[-!#$%&'*+/0-9=?A-Z^_`a-z{|}~]+)*@[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?(\.[A-Za-z0-9]([A-Za-z0-9-]{0,61}[A-Za-z0-9])?)*$/;
  return emailRegex.test(v);
};

module.exports = {
  getValidation,
  getUserValidation,
  updateUserValidation,
  signinValidation,
  signupValidation,
  createMovieValidation,
  changeMovieValidation,
  linkValidator,
  emailValidator,
};
