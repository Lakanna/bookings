import createHttpError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const isValidId = (req, res, next) => {
  const { bookingId } = req.params;

  if (!isValidObjectId(bookingId)) {
    throw createHttpError(400, 'Bad Request not valid ID');
  }

  next();
};
