import { FastifyRequest, FastifyReply } from "fastify";
import { Connection, ConnectionType } from "../models/connection.model";
import { ConnectionStoreInstance as connStore } from "../stores/connection.store";

export interface ConnectionId  {
  connection_id: String
}
export type ConnectionIdRequest = FastifyRequest<{Params: ConnectionId}>;

export default {
  index(_req: FastifyRequest, reply: FastifyReply) {
    reply.code(200).send(connStore.all());
  },

  create(req: FastifyRequest<{Body: ConnectionType}>, reply: FastifyReply) {
    const {ssid, passphrase} = req.body;
    let conn = new Connection(ssid, passphrase);
    connStore.add(conn);
    reply.code(201).send(conn);
  },

  delete(req: ConnectionIdRequest, reply: FastifyReply) {
    let conn = connStore.find(req.params.connection_id);

    if(conn) {
      conn.disconnect();
      reply.code(200).send(conn);
    } else {
      reply.code(404).type('text/html').send('Not Found')
    }
  },

  show(req: ConnectionIdRequest, reply: FastifyReply) {
    let conn = connStore.find(req.params.connection_id);

    if(conn) {
      reply.code(200).send(conn);
    } else {
      reply.code(404).type('text/html').send('Not Found')
    }
  },
};
