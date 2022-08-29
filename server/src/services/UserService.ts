// src/users/usersService.ts
import { ISerializedUser, IUser, User } from '../models/User';

// A post request should not contain an id.
export type UserCreationParams = Pick<
  IUser,
  'email' | 'firstName' | 'lastName' | 'password'
>;

export class UserService {
  public serialize(user: IUser): ISerializedUser {
    const { firstName, lastName, email } = user;
    return {
      name: firstName,
      surname: lastName,
      email: email,
    } as ISerializedUser;
  }

  public getById(id: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      const user = await User.findById(id);
      if (user) {
        resolve(user);
      } else {
        throw new Error('No user could be found.');
      }
    });
  }
  public getByEmail(email: string): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      const user = await User.findOne({ email: email }).select('+password');
      if (user) {
        resolve(user);
      } else {
        throw new Error('No user could be found.');
      }
    });
  }

  public create(userCreationParams: UserCreationParams): Promise<IUser> {
    return new Promise(async (resolve, reject) => {
      const { email, firstName, lastName, password } = userCreationParams;
      const exists = await User.findOne({ email: email });
      if (exists) return reject(new Error('User Exists'));
      const user = new User({
        email: email,
        firstName: firstName,
        lastName: lastName,
        password: password,
      });
      await user.save();
      if (user) {
        return resolve(user);
      } else {
        throw new Error('No user could be created.');
      }
    });
  }
}
