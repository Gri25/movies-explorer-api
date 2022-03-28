const router = require('express').Router();
const {
  createUser, updateProfile, login, getUserMe,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
// обязательно смотри как и куда вставлять миделверы в запросы
router.get('/users/me', auth, getUserMe);
router.patch('/users/me', auth, updateProfile);
router.post('/signup', createUser);
router.post('/signin', login);

module.exports = router;

/*
const validationPatchProfile = require('../middlewares/validationPatchProfile');
const validationPatchAvatar = require('../middlewares/validationPatchAvatar');
const validationRegister = require('../middlewares/validationRegister');
const validationLogin = require('../middlewares/validationLogin');
const validationUserId = require('../middlewares/validationUserId');

const auth = require('../middlewares/auth');

router.get('/users', auth, getUsers);

router.patch('/users/me', auth, validationPatchProfile, updateProfile);

router.patch('/users/me/avatar', auth, validationPatchAvatar, updateAvatar);

router.get('/users/me', auth, getUserMe);

router.get('/users/:id', auth, validationUserId, sendUser);

router.post('/signup', validationRegister, createUser);

router.post('/signin', validationLogin, login);
*/
