export interface IRepository {
  findOneById: (query: any, sort?: any, filter?: any) => Promise<any>;
}

export interface IEntity {
  id: string;
}