const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60000,
  max: 100,
});

module.exports = limiter;
