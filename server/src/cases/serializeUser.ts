import { ISerializedUser, IUser } from '../models/User';

export const serializeUser = (user: IUser) => {
  const { firstName, lastName, email } = user;
  return {
    name: firstName,
    surname: lastName,
    email: email,
  } as ISerializedUser;
};
