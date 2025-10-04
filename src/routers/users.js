import { Router } from 'express';

const router = Router();

import * as users from '../controllers/users.js';

import { ctrlWrapper } from '../services/ctrlWrapper.js';
// import { updateUsersCard } from '../validation/user.js';
// import { validateBody } from '../middlewares/validateBody.js';

import { authenticate } from '../middlewares/authenticate.js';

router.get('/', ctrlWrapper(users.getAllUsersController));

router.use(authenticate);

router.get('/:id', ctrlWrapper(users.getUserByIdController));

router.put('/:id', ctrlWrapper(users.updateUserController));

router.delete('/:id', ctrlWrapper(users.deleteUserController));

export default router;
