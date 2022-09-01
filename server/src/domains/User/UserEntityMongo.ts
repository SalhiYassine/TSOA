import mongoose from 'mongoose';
import { IUser } from 'src/models/User';
import EntityMongo from '../repositories/mongo/EntityMongo';
import { IUserEntity } from './types';
import * as bcrypt from 'bcrypt';

export default class UserEntityMongo
  extends EntityMongo
  implements IUserEntity
{
  email: string;
  firstName: string;
  lastName: string;
  password: string;

  constructor(user: mongoose.Document<IUser> & IUser) {
    super(`${user._id}`);
    console.log(user);

    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.password = user.password;
    this.email = user.email;
  }

  getId(): string {
    return this.id;
  }
  getFirstName(): string {
    return this.firstName;
  }
  getLastName(): string {
    return this.lastName;
  }
  getEmail(): string {
    return this.email;
  }

  async passwordMatch(password: string): Promise<boolean> {
    console.log(password, this.password);

    return await bcrypt.compare(password, this.password);
  }

  public serialize(): { email: string; name: string; surname: string } {
    return {
      email: this.email,
      name: this.firstName,
      surname: this.lastName,
    };
  }
}
