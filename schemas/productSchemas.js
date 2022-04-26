const Joi = require('joi'); //libreria que valida nuestros datos

const id = Joi.number().integer(); //tipo strig y de tipo id
const name = Joi.string().min(3).max(15); //tipo string alfa numerico de 3 a 15 caracteres
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const price_min = Joi.number().integer();
const price_max = Joi.number().integer();



const createProdectSchema = Joi.object({
  name: name.required(), //el nombre es requerido para la creacion de nuevo prod
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name, //para el update usamos la validacion declarada al comienzo para name
  price: price, //lo mismo para price pero ninguno de los dos es requerido si o si
  image: image,
  description,
  categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: Joi.when('price_min', {
    is: Joi.exist(),
    then: price_max.required(),
  })
});

module.exports = { createProdectSchema, updateProductSchema, getProductSchema, queryProductSchema };
