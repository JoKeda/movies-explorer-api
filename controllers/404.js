const { NotFoundError } = require("../errors/index")
const show404 = (req, res,next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден'))
};

module.exports = show404;
