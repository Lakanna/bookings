import { Router } from 'express';

const router = Router();

import * as users from '../controllers/users.js';

import { ctrlWrapper } from '../services/ctrlWrapper.js';
// import { updateUsersCard } from '../validation/user.js';
// import { validateBody } from '../middlewares/validateBody.js';

import { authenticate } from '../middlewares/authenticate.js';
import { isValidId } from '../middlewares/isValidId.js';

router.get('/', ctrlWrapper(users.getAllUsersController));

router.use(authenticate);

router.get('/current', ctrlWrapper(users.getCurrentUserController));

router.get('/:id', isValidId, ctrlWrapper(users.getUserByIdController));

router.patch('/update', ctrlWrapper(users.updateUserController));

router.delete('/:id', isValidId, ctrlWrapper(users.deleteUserController));

export default router;
