export interface IRepository {
  findOneById: (query: any, sort?: any, filter?: any) => Promise<any>;
}

export interface IEntity {
  id: string;
}

export interface UserCreationParams {
  name: string;
  surname: string;
  email: string;
  password: string;
}
