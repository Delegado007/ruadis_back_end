const Joi = require('joi'); //libreria que valida nuestros datos

const id = Joi.string().uuid(); //tipo strig y de tipo id
const name = Joi.string().min(3).max(15); //tipo string alfa numerico de 3 a 15 caracteres
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createProdectSchema = Joi.object({
  name: name.required(), //el nombre es requerido para la creacion de nuevo prod
  price: price.required(),
  image: image.required(),
});

const updateProductSchema = Joi.object({
  name: name, //para el update usamos la validacion declarada al comienzo para name
  price: price, //lo mismo para price pero ninguno de los dos es requerido si o si
  image: image,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProdectSchema, updateProductSchema, getProductSchema };
