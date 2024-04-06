const Joi = require('joi');

const regexObjectId = /^[0-9a-fA-F]{24}$/;

// messages
const messagesValidateId = (type) => ({
  'string.pattern.base': `Invalid Object ID in ${type} for {{#label}}`
});

const createOrUpdateOrderValidation = (payload, isUpdate) => {
  const tableSchema = Joi.object({
    _id: Joi.string().regex(regexObjectId).required().messages(messagesValidateId('table'))
  }).messages({
    'any.required': '{{#label}} di table wajib diisi'
  });

  const menuSchema = Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().regex(regexObjectId).required().messages(messagesValidateId('menu')),
        quantity: Joi.number().required(),
        is_take_away: Joi.boolean().required().default(false)
      })
    )
    .required()
    .messages({
      'any.required': '{{#label}} di menu wajib diisi'
    });

  const totalPriceSchema = Joi.number().required().messages({
    'any.required': 'total price wajib diisi'
  });

  const totalPaidSchema = Joi.number().required().messages({
    'any.required': 'total paid wajib diisi'
  });

  const isServedSchema = Joi.boolean().required().messages({
    'any.required': 'is served wajib diisi'
  });

  const isFinsihedSchema = Joi.boolean().required().messages({
    'any.required': 'is finished wajib diisi'
  });

  // validate result
  const tableValidationResult = tableSchema.validate(payload.table);
  const menuValidationResult = menuSchema.validate(payload.menu);

  const totalPriceValidationResult = totalPriceSchema.validate(payload.total_price);
  const totalPaidValidationResult = totalPaidSchema.validate(payload.total_paid);

  const isServedValidationResult = isServedSchema.validate(payload.is_served);
  const isFinishedValidationResult = isFinsihedSchema.validate(payload.is_finished);

  let error = tableValidationResult.error || menuValidationResult.error || totalPriceValidationResult.error;

  if (isUpdate && isServedValidationResult.error) {
    error = isServedValidationResult.error;
  } else if (isUpdate && isFinishedValidationResult.error) {
    error = isFinishedValidationResult.error;
  } else if (isUpdate && totalPaidValidationResult.error) {
    error = totalPaidValidationResult.error;
  }

  return error ? { error } : { value: payload };
};

const validateChangeStatusOrder = (payload) => {
  const listAllowQuery = ['id', 'is_served', 'is_finished'];

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

module.exports = { createOrUpdateOrderValidation, validateChangeStatusOrder };
