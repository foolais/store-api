const Joi = require('joi');

const createTableValidation = (payload) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    status: Joi.string().valid('empty', 'waiting', 'eating', 'finished').default('empty'),
    category: Joi.string().valid('regular', 'custom').default('regular'),
    type: Joi.string().valid('dine_in', 'take_away').default('dine_in'),
    is_order: Joi.boolean().default(false)
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
    is_order: Joi.boolean().default(false)
  }).messages({
    'any.only': '{{#label}} harus diisi {{#valids}}'
  });

  return schema.validate(payload);
};

const validateChangeOrderTable = (payload) => {
  const listAllowQuery = ['id', 'is_order'];

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

module.exports = { createTableValidation, updateTableValidation, validateChangeOrderTable };
