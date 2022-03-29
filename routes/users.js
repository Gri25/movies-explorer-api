const router = require('express').Router();
const {
  createUser, updateProfile, login, getUserMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const validationRegister = require('../middlewares/validationRegister');
const validationLogin = require('../middlewares/validationLogin');
const validationPatchProfile = require('../middlewares/validationPatchProfile');

router.get('/users/me', auth, getUserMe);
router.patch('/users/me', auth, validationPatchProfile, updateProfile);
router.post('/signup', validationRegister, createUser);
router.post('/signin', validationLogin, login);

module.exports = router;
