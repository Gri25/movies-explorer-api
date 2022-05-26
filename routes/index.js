const router = require('express').Router();
const {
  createUser, updateProfile, login, getUserMe,
} = require('../controllers/users');
const {
  getMovies, createMovies, deleteMovies,
} = require('../controllers/movies');

const auth = require('../middlewares/auth');

const validationRegister = require('../middlewares/validationRegister');
const validationLogin = require('../middlewares/validationLogin');
const validationPatchProfile = require('../middlewares/validationPatchProfile');
const validationCreateMovie = require('../middlewares/validationCreateMovie');
const validationMovieId = require('../middlewares/validationMovieId');

router.get('/users/me', auth, getUserMe);
router.patch('/users/me', auth, validationPatchProfile, updateProfile);
router.post('/signup', validationRegister, createUser);
router.post('/signin', validationLogin, login);
router.get('/movies', auth, getMovies);
router.post('/movies', auth, validationCreateMovie, createMovies);
router.delete('/movies/:id', auth, validationMovieId, deleteMovies);

module.exports = router;
