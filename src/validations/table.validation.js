const Joi = require('joi');

const createTableValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    status: Joi.string().valid('empty', 'waiting', 'finished').default('empty')
  }).messages({
    'any.required': '{{#label}} wajib diisi',
    'any.only': '{{#label}} harus diisi {{#valids}}'
  });

  return schema.validate(payload);
};

const updateTableValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string(),
    status: Joi.string().valid('empty', 'waiting', 'finished')
  }).messages({
    'any.only': '{{#label}} harus diisi {{#valids}}'
  });

  return schema.validate(payload);
};

module.exports = { createTableValidation, updateTableValidation };
