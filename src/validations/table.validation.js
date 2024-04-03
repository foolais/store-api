const Joi = require('joi');

const createTableValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    status: Joi.string().valid('empty', 'waiting', 'finished').default('empty')
  }).messages({
    'any.required': '{{#label}} wajib diisi',
    'any.only': '{{#label}} harus {{#valids}}'
  });

  return schema.validate(payload);
};

module.exports = { createTableValidation };
