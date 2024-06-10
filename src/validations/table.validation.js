const Joi = require('joi');

const createTableValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    status: Joi.string().valid('empty', 'waiting', 'eating', 'finished').default('empty'),
    category: Joi.string().valid('regular', 'custom').default('regular'),
    type: Joi.string().valid('dine_in', 'take_away').default('dine_in'),
    isOrder: Joi.boolean().default(false)
  }).messages({
    'any.required': '{{#label}} wajib diisi',
    'any.only': '{{#label}} harus diisi {{#valids}}'
  });

  return schema.validate(payload);
};

const updateTableValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string(),
    status: Joi.string().valid('empty', 'waiting', 'eating', 'finished'),
    category: Joi.string().valid('regular', 'custom'),
    type: Joi.string().valid('dine_in', 'take_away'),
    isOrder: Joi.boolean().default(false)
  }).messages({
    'any.only': '{{#label}} harus diisi {{#valids}}'
  });

  return schema.validate(payload);
};

module.exports = { createTableValidation, updateTableValidation };
