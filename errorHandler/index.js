const errorHandler = async (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ message: err.message });
  } else {
    res.status(500).send({ message: 'Что-то пошло не так.' });
  }
  next();
};

module.exports = errorHandler;
