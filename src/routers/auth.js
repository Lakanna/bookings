import { Router } from 'express';
import * as auth from '../controllers/auth.js';
import * as vldt from '../validation/auth.js';
import { ctrlWrapper } from '../services/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(vldt.authRegisterSchema),
  ctrlWrapper(auth.registerController),
);

authRouter.post(
  '/login',
  validateBody(vldt.authLoginSchema),
  ctrlWrapper(auth.loginUserController),
);

authRouter.post('/refresh', ctrlWrapper(auth.refreshUserSessionController));

authRouter.post('/logout', ctrlWrapper(auth.logoutUserController));

export default authRouter;
