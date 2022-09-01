import { IUserEntity, IUserRepository } from '../types';

export default async function registerUser(
  creationParams: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  },
  repo: IUserRepository
): Promise<IUserEntity> {
  const user = await repo.createOneUser(creationParams);
  return user;
}
