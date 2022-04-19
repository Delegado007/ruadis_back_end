const boom = require('@hapi/boom');

function validatorHandler(schema, property) {
  return (req, res, next) => {
    //creamos un middleware de forma dinamica
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    //abortEarly permite que Joi junte todos los errores exitentes y los envie
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

module.exports = validatorHandler;
