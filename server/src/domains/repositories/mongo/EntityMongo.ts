import { IEntity } from '../types';

export default class EntityMongo implements IEntity {
  id;

  constructor(id: string) {
    this.id = id;
  }
}
