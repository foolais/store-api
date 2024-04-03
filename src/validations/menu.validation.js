const Joi = require('joi');

const createMenuValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    status: Joi.string().valid('available', 'empty').default('available'),
    category: Joi.string().valid('food', 'drink').default('food')
  }).messages({
    'any.required': '{{#label}} wajib diisi',
    'any.only': '{{#label}} harus diisi {{#valids}}'
  });

  return schema.validate(payload);
};

const updateMenuValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string(),
    price: Joi.number(),
    status: Joi.string().valid('available', 'empty').default('available'),
    category: Joi.string().valid('food', 'drink').default('food')
  }).messages({
    'any.required': '{{#label}} wajib diisi',
    'any.only': '{{#label}} harus diisi {{#valids}}'
  });

  return schema.validate(payload);
};

module.exports = { createMenuValidation, updateMenuValidation };
