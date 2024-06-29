const Joi = require('joi');

const regexObjectId = /^[0-9a-fA-F]{24}$/;

// messages
const messagesValidateId = (type) => ({
  'string.pattern.base': `Invalid Object ID in ${type} for {{#label}}`
});

const createOrUpdateOrderValidation = (payload, isUpdate) => {
  const tableSchema = Joi.object({
    _id: Joi.string().regex(regexObjectId).required().messages(messagesValidateId('table')),
    name: Joi.string().required(),
    category: Joi.string().required().valid('regular', 'custom')
  }).messages({
    'any.required': '{{#label}} di table wajib diisi'
  });

  const menuSchema = Joi.array()
    .items(
      Joi.object({
        _id: Joi.string().regex(regexObjectId).required().messages(messagesValidateId('menu')),
        name: Joi.string().required(),
        price: Joi.number().required(),
        category: Joi.string().required().valid('food', 'drink', 'extra'),
        quantity: Joi.number().required(),
        is_take_away: Joi.boolean().required().default(false),
        is_served: Joi.boolean().default(false)
      })
    )
    .required()
    .messages({
      'any.required': '{{#label}} di menu wajib diisi'
    });

  const notesSchema = Joi.string().allow('').required().messages({
    'any.required': 'notes wajib diisi'
  });

  const totalPriceSchema = Joi.number().required().messages({
    'any.required': 'total price wajib diisi'
  });

  const isFinsihedSchema = Joi.boolean().required().messages({
    'any.required': 'is finished wajib diisi'
  });

  // validate result
  const tableValidationResult = tableSchema.validate(payload.table);

  const menuValidationResult = menuSchema.validate(payload.menu);

  const notesValidationResult = notesSchema.validate(payload.notes);

  const totalPriceValidationResult = totalPriceSchema.validate(payload.total_price);

  const isFinishedValidationResult = isFinsihedSchema.validate(payload.is_finished);

  let error = tableValidationResult.error || menuValidationResult.error || totalPriceValidationResult.error;

  if (isUpdate && notesValidationResult.error) {
    error = notesValidationResult.error;
  } else if (isUpdate && isFinishedValidationResult.error) {
    error = isFinishedValidationResult.error;
  }

  return error ? { error } : { value: payload };
};

const validateChangeStatusOrder = (payload, type) => {
  const listAllowQuery = ['id', 'is_finished'];

  if (type === 'query') {
    const payloadKeys = Object.keys(payload);

    if (payloadKeys.length === 1 && payloadKeys.includes('id')) {
      return { error: 'tidak diizinkan hanya mengirim id' };
    }

    for (const key of payloadKeys) {
      if (!listAllowQuery.includes(key)) {
        return { error: `${key} tidak diizinkan` };
      }
      if (payload[key] === undefined || payload[key] === null) {
        return { error: `${key} wajib ada` };
      }
    }
    return { error: null, value: payload };
  } else if (type === 'body') {
    const schema = Joi.object({
      payment_method: Joi.string().valid('cash', 'qris').required().messages({
        'any.required': 'payment method wajib diisi',
        'any.only': 'payment method harus salah satu dari [cash, qris]'
      }),
      total_price: Joi.number().required().messages({
        'any.required': 'total price wajib diisi'
      }),
      total_paid: Joi.number().required().messages({
        'any.required': 'total paid wajib diisi'
      })
    });

    const { error, value } = schema.validate(payload);

    return { error: error || null, value };
  }
};

module.exports = validateChangeStatusOrder;
const validateToogleServedStatus = (payload) => {
  const listAllowQuery = ['order_id', 'menu_id'];

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

module.exports = { createOrUpdateOrderValidation, validateChangeStatusOrder, validateToogleServedStatus };
