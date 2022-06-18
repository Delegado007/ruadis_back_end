const Joi = require('joi'); //libreria que valida nuestros datos

const id = Joi.number().integer(); //tipo strig y de tipo id
const name = Joi.string().min(3).max(15); //tipo string alfa numerico de 3 a 15 caracteres
const pages = Joi.number().integer().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();

const pages_min = Joi.number().integer();
const pages_max = Joi.number().integer();



const createFileSchema = Joi.object({
  name: name.required(), //el nombre es requerido para la creacion de nuevo prod
  pages: pages.required(),
  image: image,
  categoryId: categoryId.required(),
});

const updateFileSchema = Joi.object({
  name: name, //para el update usamos la validacion declarada al comienzo para name
  pages: pages, //lo mismo para price pero ninguno de los dos es requerido si o si
  image: image,
  categoryId
});

const getFileSchema = Joi.object({
  id: id.required(),
});

const queryFileSchema = Joi.object({
  limit,
  offset,
  pages,
  pages_min,
  pages_max: Joi.when('price_min', {
    is: Joi.exist(),
    then: pages_max.required(),
  })
});

module.exports = { createFileSchema, updateFileSchema, getFileSchema, queryFileSchema };
