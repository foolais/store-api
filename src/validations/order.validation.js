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
    'any.required': 'total_price wajib diisi'
  });

  const isFinishedSchema = Joi.boolean().required().default(false).messages({
    'any.required': 'is finished wajib diisi'
  });

  // validate result
  const tableValidationResult = tableSchema.validate(payload.table);
  const menuValidationResult = menuSchema.validate(payload.menu);
  const totalPriceValidationResult = totalPriceSchema.validate(payload.total_price);
  const isFinishedValidationResult = isFinishedSchema.validate(payload.is_finished);

  let error = tableValidationResult.error || menuValidationResult.error || totalPriceValidationResult.error;

  if (isUpdate && isFinishedValidationResult.error) {
    error = isFinishedValidationResult.error;
  }

  return error ? { error } : { value: payload };
};

module.exports = { createOrUpdateOrderValidation };
