import { FastifyInstance } from "fastify";
import { RoutesEnum } from "../types/routes.enum";
import { GeckoController } from "./gecko.controller";

const controller = new GeckoController();

export async function geckoRoute(fastify: FastifyInstance) {
  fastify.post(RoutesEnum.GET_GECKO, controller.getGeckoDetail);
}
