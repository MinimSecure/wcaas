import { AbstractStore } from "./abstract.store";
import { Connection } from "../models/connection.model";

export class ConnectionStore extends AbstractStore<Connection> { }

export const ConnectionStoreInstance = new ConnectionStore();
