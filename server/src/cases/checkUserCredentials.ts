import { IUser } from '../models/User';
import { UserRepository } from '../repository/userRepository';
const userRepo = new UserRepository();

export const checkUserCredentials = async (
  email: string,
  password: string
): Promise<IUser> => {
  const user = await userRepo.getByEmailWithPassword(email);
  const matches = await user.matchPassword(password);
  if (matches) return user;
  else {
    throw new Error('Credentials do not match a user in the database.');
  }
};
