import fastify, { FastifyInstance } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";
import api_routes from "./routes/v1_api";

const server: FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify();

function build() {
  server.register(api_routes, { prefix: "/api/v1/" });

  return server;
}

export default build;
