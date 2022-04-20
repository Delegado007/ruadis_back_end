const { ValidationError } = require('sequelize')
function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err); // si enviamos error es un middlewares de tipo error
}

function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  console.log(err.isBoom);
  if (err.isBoom) {
    //si es de tipo boom
    const { output } = err; //leemos el output del error
    res.status(output.statusCode).json(output.payload); //leemos que status code debemos responder
  }
  next(error); // si no es de tipo boom ejecutamos el siguiente middleware
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors
    });
  }
  next(err);
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler };
