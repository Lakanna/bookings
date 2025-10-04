import Joi from 'joi';
import mongoose from 'mongoose';

const objectIdValidator = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('Invalid ObjectId');
  }
  return value;
};

export const bookingSchema = Joi.object({
  clientId: Joi.string().required().custom(objectIdValidator),
  businessId: Joi.string().required().custom(objectIdValidator),
  startAt: Joi.date().greater('now').required().messages({
    'date.greater': 'Start time must be in the future',
    'any.required': 'Start time is required',
  }),

  endAt: Joi.date().greater(Joi.ref('startAt')).required().messages({
    'date.greater': 'End time must be after start time',
    'any.required': 'End time is required',
  }),

  status: Joi.string()
    .valid('pending', 'confirmed', 'cancelled')
    .default('pending'),

  notes: Joi.string().allow('').optional(),
});

export const updateBookingSchema = Joi.object({
  bookingId: Joi.string().required().custom(objectIdValidator),
  clientId: Joi.string().required().custom(objectIdValidator),
  startAt: Joi.date()
    .greater('now')
    .messages({
      'date.greater': 'Start time must be in the future',
    })
    .optional(),

  endAt: Joi.date()
    .greater(Joi.ref('startAt'))
    .messages({
      'date.greater': 'End time must be after start time',
    })
    .optional(),

  notes: Joi.string().allow('').optional(),
});
