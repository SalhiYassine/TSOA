import { IUserEntity, IUserRepository } from '../types';

export default async function getUserByEmail(
  repo: IUserRepository,
  email: string
): Promise<IUserEntity | null> {
  const user = await repo.getUserByEmail(email);
  return user ? user : null;
}
