const { model, Schema, Types } = require('mongoose');
const { linkValidator } = require('../validation/index');

const movieSchema = new Schema({
  movieId: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: linkValidator,
      message: 'Некорректная ссылка',
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: linkValidator,
      message: 'Некорректная ссылка',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: linkValidator,
      message: 'Некорректная ссылка',
    },
  },
  owner: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
    select: false,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = model('movie', movieSchema);
