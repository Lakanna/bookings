import {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../services/users.js';

export const getAllUsersController = async (req, res) => {
  const role = req.body || 'business';
  const usersList = await getAllUsers(role);

  res.status(200).json({
    status: 200,
    message: 'Users successfully found',
    data: usersList,
  });
};

export const getUserByIdController = async (req, res) => {
  const _id = req.params.id;

  const user = await getUserById(_id);

  res
    .status(200)
    .json({ status: 200, message: 'User successfully found', data: user });
};

export const updateUserController = async (req, res) => {
  const _id = req.params.id;
  const payload = req.body;

  try {
    const updatedUser = await updateUser(_id, payload);

    res.status(200).json({
      status: 200,
      message: 'User successfully updated',
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ status: 400, message: error.message });
  }
};

export const deleteUserController = async (req, res) => {
  const _id = req.params.id;

  await deleteUser(_id);

  res.status(204).json({ status: 204 });
};
