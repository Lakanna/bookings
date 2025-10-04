import {
  login,
  logout,
  register,
  refreshUserSession,
} from '../services/auth.js';

import { ONE_MOUNTH } from '../constants/users.js';

/**
  |============================
  | register User controller
  |============================
*/
export const registerController = async (req, res) => {
  const payload = req.body;

  const user = await register(payload);

  res
    .status(201)
    .json({ status: 201, message: 'User successfully registred', data: user });
};

/**
  |============================
  | login User controller
  |============================
*/
export const loginUserController = async (req, res) => {
  const session = await login(req.body);

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: { accessToken: session.accessToken },
  });
};

/**
  |============================
  | logout User controller
  |============================
*/

export const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await logout(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

/**
  |============================
  | setup session (local function)
  |============================
*/
const setupSession = (res, session) => {
  res.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MOUNTH),
  });

  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_MOUNTH),
  });
};

/**
  |============================
  | refreshUserSession controller
  |============================
*/

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUserSession({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: { accessToken: session.accessToken },
  });
};
