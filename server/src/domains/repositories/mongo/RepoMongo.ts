import { IRepository } from '../types';

export default class RepoMongo implements IRepository {
  protected Model;

  constructor(model: any) {
    this.Model = model;
  }

  findOneById(query: any, sort?: any, filter?: any) {
    return Promise.resolve();
  }
}
