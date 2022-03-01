import { Connection } from "../models/connection.model";

interface ConnectionIndex {
  [index: string]: Connection
}

export class ConnectionStore {
  items: ConnectionIndex;

  constructor() {
    this.deleteAll();
  }

  add(conn: Connection) {
    this.items[conn.uuid as string] = conn;
  }

  all() {
    return Object.values(this.items);
  }

  find(uuid: String) {
    return this.items[uuid as string];
  }

  deleteAll() {
    this.items = {};
  }
}

export const ConnectionStoreInstance = new ConnectionStore();
