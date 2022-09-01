import { IUserEntity, IUserRepository } from '../types';

export default async function checkPasswordMatches(
  email: string,
  password: string,
  repo: IUserRepository
): Promise<boolean> {
  const user = await repo.getUserByEmail(email);
  if (user) {
    console.log(password);
    return user.passwordMatch(password);
  }
  return false;
}
