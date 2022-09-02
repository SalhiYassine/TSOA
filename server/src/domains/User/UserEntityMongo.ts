import mongoose from 'mongoose';
import { IUser } from '../../models/User';
import EntityMongo from '../data/mongo/EntityMongo';
import { IUserEntity } from './types';
import * as bcrypt from 'bcrypt';

export default class UserEntityMongo
  extends EntityMongo
  implements IUserEntity
{
  protected email: string;
  protected firstName: string;
  protected lastName: string;
  protected password: string;

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
  getName(): string {
    return this.firstName;
  }
  getSurname(): string {
    return this.lastName;
  }
  getEmail(): string {
    return this.email;
  }

  async passwordMatch(password: string): Promise<boolean> {
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
