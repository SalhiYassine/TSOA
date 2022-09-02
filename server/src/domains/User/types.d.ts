import { UserCreationParams } from '../../repository/userRepository';
import { IEntity, IRepository } from '../data/types';

interface IUserRepository extends IRepository {
  getOneUser: (id: string) => Promise<IUserEntity | null>;
  getUserByEmail: (email: string) => Promise<IUserEntity | null>;
  createOneUser: (creationParams: UserCreationParams) => Promise<IUserEntity>;
}

interface IUserEntity extends IEntity {
  getName: () => string;
  getSurname: () => string;
  getEmail: () => string;
  serialize: () => { email: string; name: string; surname: string };
  passwordMatch: (password: string) => Promise<boolean>;
}
