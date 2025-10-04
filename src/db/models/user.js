import { Schema, model } from 'mongoose';
import { emailRegexp } from '../../constants/users.js';

import { handleSaveError, setupUpdateValidator } from './hooks.js';

const usersSchema = new Schema(
  {
    name: {
      type: String,
      default: '',
    },
    email: { type: String, match: emailRegexp, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['client', 'business'], required: true },
    phone: { type: String },

    description: { type: String },
    schedule: { type: [String], default: [] },
  },
  { timestamps: true, versionKey: false },
);

usersSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

usersSchema.post('save', handleSaveError);

usersSchema.pre('findOneAndUpdate', setupUpdateValidator);

usersSchema.post('findOneAndUpdate', handleSaveError);

export const UsersCollection = model('users', usersSchema);
