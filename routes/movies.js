const routerMovie = require('express').Router();
const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');
const validationCreateMovie = require('../middlewares/validationCreateMovie');
const validationMovieId = require('../middlewares/validationMovieId');

routerMovie.get('/movies', auth, getMovies);

routerMovie.post('/movies', auth, validationCreateMovie, createMovies);

routerMovie.delete('/movies/:id', auth, validationMovieId, deleteMovies);

module.exports = routerMovie;
