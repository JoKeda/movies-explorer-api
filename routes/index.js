const express = require('express');

const rootRouter = express.Router();

const users = require('./users');
const movies = require('./movies');
const unknown = require('./unknown');

rootRouter.use(users, movies, unknown);

module.exports = rootRouter;
