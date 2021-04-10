const { Types } = require('mongoose');
const Movie = require('../models/Movie');
const { WrongDataError, NotFoundError, ForbiddenError } = require('../errors/index');

const { ObjectId } = Types;

const getMovies = async (req, res, next) => {
  try {
    const { user } = req;
    const movies = await Movie.find({owner: user._id});
    return res.status(200).send(movies);
  } catch (e) {
    next(e);
  }
};

const createMovie = async (req, res, next) => {
  try {
    const { user } = req;
    await Movie.create({ ...req.body, owner: user._id });
    res.status(201).send({ message: 'Фильм создан!' });
  } catch (e) {
    next(e);
  }
};

const deleteMovie = async (req, res, next) => {
  const { movieId } = req.params;
  if (!ObjectId.isValid(movieId)) next(new WrongDataError('Некорректный ID'));
  try {
    const deletingMovie = await Movie.findById(movieId).select('+ owner');
    if (!deletingMovie) next(new NotFoundError('Фильм не найден.'));
    if (deletingMovie?.owner?.toString() !== req?.user?._id?.toString()) {
      return next(new ForbiddenError('Нельзя удалять чужой фильм!'));
    }
    await Movie.remove(deletingMovie);
    return res.status(200).send({ message: 'Фильм удален' });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getMovies, createMovie, deleteMovie,
};
