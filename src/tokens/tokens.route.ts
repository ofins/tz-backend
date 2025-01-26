import { FastifyInstance } from "fastify";
import { RoutesEnum } from "../types/routes.enum.ts";
import { TokensController } from "./tokens.controller.ts";

const controller = new TokensController();

export async function tokensRoute(fastify: FastifyInstance) {
  fastify.get(RoutesEnum.GET_TOKENS, controller.getTokenBySearchTerm);
  fastify.get(RoutesEnum.GET_TOKEN, controller.getTokenList);
}
