const Joi = require('joi'); //libreria que valida nuestros datos

const id = Joi.number().integer(); //tipo strig y de tipo id
const name = Joi.string(); //tipo string alfa numerico de 3 a 15 caracteres
const pages = Joi.number().integer();
const image = Joi.string();
const categoryId = Joi.number().integer();
const path = Joi.string();
const size = Joi.number().integer()
const searchInput = Joi.string()
const limit = Joi.number().integer();
const offset = Joi.number().integer();

const pages_min = Joi.number().integer();
const pages_max = Joi.number().integer();



const createFileSchema = Joi.object({
  name: name.required(), //el nombre es requerido para la creacion de nuevo prod
  pages: pages.required(),
  path: path,
  image: image,
  size: size,
  categoryId: categoryId,
});

const updateFileSchema = Joi.object({
  name: name, //para el update usamos la validacion declarada al comienzo para name
  pages: pages, //lo mismo para price pero ninguno de los dos es requerido si o si
  image: image,
  categoryId
});

const getSearchSchema = Joi.object({
  searchInput,
})

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

module.exports = { createFileSchema, updateFileSchema, getSearchSchema, getFileSchema, queryFileSchema };
