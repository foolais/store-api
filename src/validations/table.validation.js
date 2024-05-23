const Joi = require('joi');

const createTableValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    status: Joi.string().valid('empty', 'waiting', 'finished').default('empty'),
    category: Joi.string().valid('regular', 'custom').default('regular'),
    type: Joi.string().valid('dine_in', 'take_away').default('dine_in')
  }).messages({
    'any.required': '{{#label}} wajib diisi',
    'any.only': '{{#label}} harus diisi {{#valids}}'
  });

  return schema.validate(payload);
};

const updateTableValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string(),
    status: Joi.string().valid('empty', 'waiting', 'finished'),
    category: Joi.string().valid('regular', 'custom'),
    type: Joi.string().valid('dine_in', 'take_away')
  }).messages({
    'any.only': '{{#label}} harus diisi {{#valids}}'
  });

  return schema.validate(payload);
};

module.exports = { createTableValidation, updateTableValidation };
