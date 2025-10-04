import { BookingCollection } from '../db/models/booking.js';

export const createBooking = async (payload) => {
  const booking = await BookingCollection.create(payload);
  return booking;
};

export const getBookingsForClient = async (filter) => {
  const bookings = await BookingCollection.find(filter).sort({ startAt: 1 });
  return bookings;
};

export const bookingIsTaken = async ({
  businessId,
  startAt,
  endAt,
  bookingId,
}) => {
  const isTaken = await BookingCollection.findOne({
    businessId,
    status: { $ne: 'cancelled' },
    _id: { $ne: bookingId },
    $or: [
      { startAt: { $lt: endAt, $gte: startAt } },
      { endAt: { $gt: startAt, $lte: endAt } },
      { startAt: { $lte: startAt }, end: { $gte: endAt } },
    ],
  });

  return isTaken;
};

export const getBookingById = async ({ _id, clientId }) => {
  const booking = await BookingCollection.findOne({ _id, clientId });
  return booking;
};

export const deleteBooking = async ({ _id, clientId }) => {
  const deleted = await BookingCollection.findOneAndDelete({ _id, clientId });
  return deleted;
};
