import { IUserRepository } from './types';
import {
  checkPasswordMatches,
  getUserByEmail,
  registerUser,
} from './Use-cases';

export const UserService = (repo: IUserRepository) => {
  const registerOneUser = async (creationParams: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }): Promise<any> => {
    const exists = await getUserByEmail(repo, creationParams.email);
    if (exists) throw new Error('User already exists');
    const user = await registerUser(creationParams, repo);
    return user.serialize();
  };

  const authenticateUser = async (email: string, password: string) => {
    const user = await getUserByEmail(repo, email);
    if (!user) throw new Error('Authentication failed');
    const match = await checkPasswordMatches(email, password, repo);
    if (!match) throw new Error('Authentication failed');
    return user.serialize();
  };

  return { registerOneUser, authenticateUser };
};
