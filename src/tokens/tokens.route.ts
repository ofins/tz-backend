import { FastifyInstance } from "fastify";
import { RoutesEnum } from "../types/routes.enum";
import { TokensController } from "./tokens.controller";

const controller = new TokensController();

export async function tokensRoute(fastify: FastifyInstance) {
  fastify.get(RoutesEnum.GET_TOKENS, controller.getTokenList);
  fastify.get(RoutesEnum.GET_TOKEN, controller.getTokenDetail);
  fastify.get(RoutesEnum.GET_TOKEN_HOLDER, controller.getTokenHolder);
  fastify.get(RoutesEnum.GET_TRADES, controller.getTrades);
}
