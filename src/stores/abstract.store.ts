import { Entity } from '../models/interfaces.model';

export abstract class AbstractStore<T extends Entity> {
  items: Array<T>;

  constructor() {
    this.deleteAll();
  }

  add(conn: T): T {
    this.items.push(conn);

    return conn;
  }

  all(): Array<T> {
    return this.items;
  }

  find(uuid: String): T {
    return this.items.find(i => i.uuid === uuid);
  }

  deleteAll() {
    this.items = [];
  }
}
