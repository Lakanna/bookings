import { UsersCollection } from '../db/models/user.js';

export const getAllUsers = async ({ role }) => {
  const filter = {};
  if (role) filter.role = role;
  const users = await UsersCollection.find(filter).sort({ createdAt: -1 });

  return users;
};

export const getUserById = async ({ _id }) => {
  const user = await UsersCollection.findById(_id);

  return user;
};

export const updateUser = async ({ _id, payload }) => {
  const updated = await UsersCollection.findByIdAndUpdate({ _id }, payload, {
    new: true,
  });

  return updated;
};

export const deleteUser = async ({ _id }) => {
  const deletedUser = await UsersCollection.findOneAndDelete({
    _id,
  });
  return deletedUser;
};
