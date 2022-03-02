import { Connection } from "../models/connection.model";

export class ConnectionStore {
  items: Array<Connection>;

  constructor() {
    this.deleteAll();
  }

  add(conn: Connection) {
    this.items.push(conn);
  }

  all(): Array<Connection> {
    return this.items;
  }

  find(uuid: String): Connection {
    return this.items.find(i => i.uuid === uuid);
  }

  deleteAll() {
    this.items = [];
  }
}

export const ConnectionStoreInstance = new ConnectionStore();
