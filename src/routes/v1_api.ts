import { FastifyInstance } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";

import ActionsController from "../controllers/actions.controller";
import { ConnectionSchema, ConnectionType } from "../models/connection.model";
import ConnectionsController from "../controllers/connections.controller";
import SessionsController from "../controllers/sessions.controller";

function speedtest_routes(fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>, opts: { prefix: string }, next: (err?: Error) => void) {
  // Register a new session
  fastify.post("/sessions", SessionsController.create);

  // destroys a session
  fastify.delete("/sessions/:session_id", SessionsController.create);

  // Get all connections
  fastify.get("/connections", ConnectionsController.index);

  // Register a new connection transaction
  fastify.post<{Body: ConnectionType, Reply: ConnectionType}>(
    "/connections",
    {
      schema: {
        body: ConnectionSchema,
        response: { 201: ConnectionSchema },
      },
    },
    ConnectionsController.create
  );

  // Get connection status
  fastify.get(
    "/connections/:connection_id",
    {
      schema: {
        response: { 200: ConnectionSchema },
      },
    },
    ConnectionsController.show);

  // End a connection transaction
  fastify.delete(
    "/connections/:connection_id",
    {
      schema: {
        response: { 200: ConnectionSchema },
      },
    },
    ConnectionsController.delete);

  // Enqueue a new command
  fastify.post("/connection/:connection_id/actions", ActionsController.create);

  // Get command status
  fastify.get("/connection/:connection_id/actions/:action_id", ActionsController.show);

  next();
}

export default speedtest_routes;
