import mongoose from 'mongoose';
import { UserCreationParams } from '../../repository/userRepository';
import { IUser } from '../../models/User';
import RepoMongo from '../data/mongo/RepoMongo';
import { IUserRepository } from './types';
import UserEntityMongo from './UserEntityMongo';

export default class UserRepoMongo
  extends RepoMongo
  implements IUserRepository
{
  constructor(Model: mongoose.Document<IUser>) {
    super(Model);
  }

  async getOneUser(id: string) {
    const user = await this.Model.findOne({ _id: id });
    if (user) return new UserEntityMongo(user);
    return null;
  }

  async getUserByEmail(email: string) {
    const user = await this.Model.findOne({ email });
    if (user) return new UserEntityMongo(user);
    return null;
  }

  async createOneUser(creationParams: UserCreationParams) {
    const user = new this.Model(creationParams);
    await user.save();
    return new UserEntityMongo(user);
  }
}
