import express from 'express';
import cors from 'cors';
import { env } from './services/env.js';

import router from './routers/index.js';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import cookieParser from 'cookie-parser';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());

  app.use(
    cors({
      credentials: true,
      origin: [
        // env('APP_DOMAIN'),
        'https://bookings-app-frontend.vercel.app/',
        'http://localhost:5173',
      ],
    }),
  );
  app.use(cookieParser());

  app.use(router);

  // app.use(logger);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
