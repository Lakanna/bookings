import { Router } from 'express';

import { ctrlWrapper } from '../services/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { bookingSchema, updateBookingSchema } from '../validation/bookings.js';
import {
  createBookingController,
  deleteBookingController,
  getClientsBookings,
  updateBookingByClient,
} from '../controllers/booking.js';
import { authenticate } from '../middlewares/authenticate.js';

const bookingsRouter = Router();

bookingsRouter.use(authenticate);

bookingsRouter.post(
  '/',
  validateBody(bookingSchema),
  ctrlWrapper(createBookingController),
);

bookingsRouter.get('/', ctrlWrapper(getClientsBookings));

bookingsRouter.patch(
  '/:bookingId',
  validateBody(updateBookingSchema),
  ctrlWrapper(updateBookingByClient),
);

bookingsRouter.delete(
  '/:bookingId',
  validateBody(updateBookingSchema),
  ctrlWrapper(deleteBookingController),
);

export default bookingsRouter;
