import User from "../../models/User.js";

export const findAllUsers = async () => {
  const users = await User.find();

  return users;
};
