const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const rootRouter = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./errorHandler');
const limiter = require('./rateLimiter');

const app = express();
const config = require('./config/index');

const PORT = process.env.PORT ?? config.PORT;
const DB = process.env.NODE_ENV === 'production' ? process.env.DB : config.DB;

app.use(cors());
app.use(express.json({ extended: true }));
app.use(requestLogger);
app.use(rootRouter);
app.use(limiter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}`);
    });
  } catch (e) {
    console.log(e.message);
  }
  return 0;
};

start();
