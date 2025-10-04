import { Schema, model } from 'mongoose';
import { handleSaveError, setupUpdateValidator } from './hooks.js';

const bookingSchema = new Schema(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    businessId: { type: Schema.Types.ObjectId, ref: 'users', required: true },

    startAt: { type: Date, required: true },
    endAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'cancelled'],
      default: 'pending',
    },
    notes: { type: String },
  },
  { versionKey: false, timestamps: true },
);

bookingSchema.post('save', handleSaveError);

bookingSchema.pre('findOneAndUpdate', setupUpdateValidator);

bookingSchema.post('findOneAndUpdate', handleSaveError);

export const BookingCollection = model('bookings', bookingSchema);
