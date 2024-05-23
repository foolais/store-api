const Joi = require('joi');

const createUserValidation = (payload) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().required().valid('regular', 'admin')
  }).messages({
    'any.required': '{{#label}} wajib diisi',
    'any.only': '{{#label}} harus diisi {{#valids}}'
  });

  return schema.validate(payload);
};

const createSessionValidation = (payload) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }).messages({
    'any.required': '{{#label}} wajib diisi'
  });

  return schema.validate(payload);
};

module.exports = { createUserValidation, createSessionValidation };
