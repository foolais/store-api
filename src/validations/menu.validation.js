const Joi = require('joi');

const createMenuValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    price: Joi.number().required(),
    is_available: Joi.boolean().default(true),
    category: Joi.string().valid('food', 'drink', 'extra').default('food')
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
    is_available: Joi.boolean().default(true),
    category: Joi.string().valid('food', 'drink', 'extra').default('food')
  }).messages({
    'any.required': '{{#label}} wajib diisi',
    'any.only': '{{#label}} harus diisi {{#valids}}'
  });

  return schema.validate(payload);
};

const validateChangeAvailableMenu = (payload) => {
  const listAllowQuery = ['id', 'is_available'];

  const payloadKeys = Object.keys(payload);

  if (payloadKeys.length === 1) return { error: 'tidak diizinkan hanya mengirim id' };

  for (const key of payloadKeys) {
    if (!listAllowQuery.includes(key)) return { error: `${key} tidak diizinkan` };
    if (payload[key] && !payload[key]) {
      return { error: `${key} wajib ada` };
    }
  }

  return { value: payload };
};

module.exports = { createMenuValidation, updateMenuValidation, validateChangeAvailableMenu };
