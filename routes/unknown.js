const router = require('express').Router();
const show404 = require('../controllers/404');

router.all('/*', show404);

module.exports = router;
