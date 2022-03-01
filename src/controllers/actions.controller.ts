import { FastifyRequest, FastifyReply } from "fastify";
import { ConnectionStoreInstance as connStore } from "../stores/connection.store";
import { ActionType } from "../models/action.model";
import { ConnectionId } from "./connections.controller";

export type ActionCreateRequest = FastifyRequest<{
  Params: ConnectionId
  Body: ActionType
}>;

export default {
  create(req: ActionCreateRequest, reply: FastifyReply) {
    let conn = connStore.find(req.params.connection_id);

    if(conn) {
      conn.addAction(req.body);

      reply.code(200).send(conn);
    } else {
      reply.code(404).type('text/html').send('Not Found')
    }
  },

  delete(req: FastifyRequest, reply: FastifyReply) {
    
  },

  show(req: FastifyRequest, reply: FastifyReply) {
    
  },
}
