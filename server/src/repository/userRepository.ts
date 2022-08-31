import { ISerializedUser, IUser, User } from '../models/User';

export type UserCreationParams = Pick<
  IUser,
  'email' | 'firstName' | 'lastName' | 'password'
>;

export class UserRepository {
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
      const user = await User.findOne({ email: email });
      if (user) {
        resolve(user);
      } else {
        throw new Error('No user could be found.');
      }
    });
  }

  public async getByEmailWithPassword(email: string): Promise<IUser> {
    const user = await User.findOne({ email: email }).select('+password');
    if (user) {
      return user;
    } else {
      throw new Error('No user could be found.');
    }
  }

  public async create(userCreationParams: UserCreationParams): Promise<IUser> {
    const { email, firstName, lastName, password } = userCreationParams;
    const exists = await User.findOne({ email: email });
    if (exists) {
      throw new Error('A user matching this email already exists!');
    }
    const user = new User({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    });
    await user.save();
    if (user) {
      return user;
    } else {
      throw new Error('No user could be created.');
    }
  }
}
