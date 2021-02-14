const router = require('express').Router();
const {
  createUser, updateUser, signin, getCurrentUser,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const {
  getValidation,
  updateUserValidation,
  signinValidation,
  signupValidation,
} = require('../validation/index');

router.get('/users/me', getValidation, auth, getCurrentUser);
router.put('/users/me', updateUserValidation, auth, updateUser);
router.post('/signin', signinValidation, signin);
router.post('/signup', signupValidation, createUser);

module.exports = router;
