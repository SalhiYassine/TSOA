import { IEntity, IRepository } from '../repositories/types';

interface IUserRepository extends IRepository {
  getOneUser: (id: string) => Promise<IUserEntity | null>;
  getUserByEmail: (email: string) => Promise<IUserEntity | null>;
  createOneUser: (creationParams: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<IUserEntity>;
}

interface IUserEntity extends IEntity {
  email: string;
  firstName: string;
  lastName: string;
  password: string;

  getFirstName: () => string;
  getLastName: () => string;
  getEmail: () => string;
  serialize: () => { email: string; name: string; surname: string };
  passwordMatch: (password: string) => Promise<boolean>;
}
