const Joi = require('joi');

const createMenuValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    status: Joi.string().valid('available', 'empty').default('available'),
    category: Joi.string().valid('food', 'drink').default('food'),
    is_additional: Joi.boolean().default(false),
    additional: Joi.array().items(Joi.string()).when('is_additional', {
      is: true,
      then: Joi.required()
    })
  }).messages({
    'any.required': '{{#label}} wajib diisi',
    'any.only': '{{#label}} harus diisi {{#valids}}'
  });

  return schema.validate(payload);
};

module.exports = { createMenuValidation };
