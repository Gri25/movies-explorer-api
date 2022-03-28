const routerMovie = require('express').Router();
const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');

routerMovie.get('/movies', getMovies);

routerMovie.post('/movies', createMovies);

routerMovie.delete('/movies/:id', deleteMovies);

module.exports = routerMovie;

/*
const validateRegisterCard = require('../middlewares/validationCard');
const validationCardId = require('../middlewares/validationCardId');
const auth = require('../middlewares/auth');

routerCard.get('/cards', auth, getCards);

routerCard.post('/cards', auth, validateRegisterCard, createCard);

routerCard.delete('/cards/:id', auth, validationCardId, deleteCard);
*/
