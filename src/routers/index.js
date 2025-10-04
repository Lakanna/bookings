import { Router } from 'express';

import authRouter from './auth.js';
import usersRouter from './users.js';
import bookingsRouter from './bookings.js';

const router = Router();

router.use('/auth', authRouter);

router.use('/users', usersRouter);

router.use('/bookings', bookingsRouter);

export default router;
