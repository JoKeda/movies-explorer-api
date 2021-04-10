const router = require('express').Router();
const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');
const { getValidation, createMovieValidation, changeMovieValidation } = require('../validation/index');

router.get('/movies', getValidation, auth, getMovies);
router.post('/movies', createMovieValidation, auth, createMovie);
router.delete('/movies/:movieId', changeMovieValidation, auth, deleteMovie);

module.exports = router;
