import { IUser } from '../models/User';
import {
  UserCreationParams,
  UserRepository,
} from '../repository/userRepository';
const userRepo = new UserRepository();

export const createUser = async (
  requestBody: UserCreationParams
): Promise<IUser> => {
  return await userRepo.create(requestBody);
};
