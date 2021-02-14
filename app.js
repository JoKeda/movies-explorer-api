const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cors = require('cors');
const userRouter = require('./routes/users');
const moviesRouter = require('./routes/movies');
const unknownRouter = require('./routes/unknown');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const app = express();
const config = require('./config/index');
const PORT = process.env.PORT ?? config.PORT;
const DB = process.env.NODE_ENV === 'production' ? process.env.DB : config.DB;

app.use(cors());
app.use(express.json({ extended: true }));
app.use(requestLogger);
app.use(userRouter, moviesRouter, unknownRouter);

const errorHandler = async (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Что-то пошло не так.' });
  }
  if(next) next()
};
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
