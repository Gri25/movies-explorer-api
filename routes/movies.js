const routerMovie = require('express').Router();
const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');
const auth = require('../middlewares/auth');

routerMovie.get('/movies', auth, getMovies);

routerMovie.post('/movies', auth, createMovies);

routerMovie.delete('/movies/:id', auth, deleteMovies);

module.exports = routerMovie;

/*
const validateRegisterCard = require('../middlewares/validationCard');
const validationCardId = require('../middlewares/validationCardId');
const auth = require('../middlewares/auth');

routerCard.get('/cards', auth, getCards);

routerCard.post('/cards', auth, validateRegisterCard, createCard);

routerCard.delete('/cards/:id', auth, validationCardId, deleteCard);
*/
