import { UsersCollection } from '../db/models/user.js';
import {
  bookingIsTaken,
  createBooking,
  deleteBooking,
  getBookingById,
  getBookingsForClient,
} from '../services/bookings.js';

export const createBookingController = async (req, res) => {
  const { businessId, startAt, endAt, notes } = req.body;

  const business = await UsersCollection.findOne({
    _id: businessId,
    role: 'business',
  });

  if (!business) {
    return res
      .status(400)
      .json({ status: 400, message: 'Бізнес з таким ID не знайдений' });
  }

  if (new Date(startAt) < new Date()) {
    return res
      .status(400)
      .json({ status: 400, message: 'Не можна бронювати час у минулому' });
  }

  if (new Date(endAt) <= new Date(startAt)) {
    return res
      .status(400)
      .json({ status: 400, message: 'Невірний інтервал часу' });
  }

  const isTaken = await bookingIsTaken({ businessId, startAt, endAt });

  if (isTaken) {
    return res
      .status(400)
      .json({ status: 400, message: 'Цей час уже зайнятий' });
  }

  const booking = await createBooking({
    clientId: req.user._id,
    businessId,
    startAt,
    endAt,
    status: 'pending',
    notes,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created booking',
    data: booking,
  });
};

export const getClientsBookings = async (req, res) => {
  const filter = {
    [req.user.role === 'client' ? 'clientId' : 'businessId']: req.user._id,
  };

  const bookings = await getBookingsForClient(filter);

  res.status(200).json({ status: 200, data: bookings });
};

export const updateBookingByClient = async (req, res) => {
  const { bookingId } = req.params;
  const { startAt, endAt, notes } = req.body;
  const clientId = req.user._id;

  const booking = await getBookingById({ _id: bookingId, clientId });
  if (!booking) {
    return res
      .status(404)
      .json({ status: 404, message: 'Booking not found or access denied' });
  }

  if (startAt || endAt) {
    const newStart = startAt ? new Date(startAt) : booking.startAt;
    const newEnd = endAt ? new Date(endAt) : booking.endAt;

    const isTaken = await bookingIsTaken({
      businessId: booking.businessId,
      startAt: newStart,
      endAt: newEnd,
      bookingId: booking._id,
    });

    if (isTaken) {
      return res
        .status(400)
        .json({ status: 400, message: 'This time slot is already taken' });
    }

    booking.startAt = newStart;
    booking.endAt = newEnd;
  }

  if (notes !== undefined) booking.notes = notes;

  await booking.save();

  res.status(200).json({ status: 200, data: booking });
};

export const deleteBookingController = async (req, res) => {
  const booking = await getBookingById({
    clientId: req.user._id,
    _id: req.params.bookingId,
  });

  if (!booking)
    return res
      .status(400)
      .json({ status: 404, message: 'Booking not found or access denied' });

  await deleteBooking({ clientId: booking.clientId, _id: booking._id });

  res
    .status(204)
    .json({ status: 204, message: 'The booking successfully deleted' });
};
