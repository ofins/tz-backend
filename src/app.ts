import cors from "@fastify/cors";
import axios from "axios";
import * as dotenv from "dotenv";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { tokensRoute } from "./tokens/tokens.route.ts";
import { RoutesEnum, TamaRouteEnum } from "./types/routes.enum.ts";
import { QueryParams } from "./types/tama.types.ts";
dotenv.config();

const fastify = Fastify({ logger: true });

export const TAMA_BASE_URL = process.env.ENV_TAMA_BASE_URL;

await fastify.register(cors, {
  origin: true, // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Optional: Define allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Optional: Define allowed headers
});

fastify.get(
  RoutesEnum.GET_TRADES,
  async (
    request: FastifyRequest<{ Querystring: QueryParams }>,
    reply: FastifyReply
  ) => {
    try {
      const { tokenId = null, current = 1, pageSize = 25 } = request.query;

      if (typeof tokenId !== "string" || tokenId <= 0) {
        return reply
          .status(400)
          .send({ error: "Token ID must be a positive number." });
      }

      if (typeof current !== "string" || current <= 0) {
        return reply
          .status(400)
          .send({ error: "Page must be a positive number." });
      }

      if (typeof pageSize !== "string" || pageSize <= 0) {
        return reply
          .status(400)
          .send({ error: "Limit must be a positive number." });
      }

      const apiUrl = new URL(TAMA_BASE_URL + TamaRouteEnum.GET_TRADES);
      apiUrl.search = new URLSearchParams({
        tokenId,
        page: current,
        limit: pageSize,
      }).toString();

      const { data } = await axios.get(apiUrl.toString());

      return { message: "Data fetched successfully!", data };
    } catch (error: any) {
      fastify.log.error(error);

      const status = error.response?.status || 500;
      const errorMessage = error.response?.data?.message || error.message;

      reply.status(status).send({ error: errorMessage });
    }
  }
);

await fastify.register(tokensRoute);

fastify.get(
  RoutesEnum.GET_TOKEN_HOLDER,
  async (
    request: FastifyRequest<{ Querystring: QueryParams }>,
    reply: FastifyReply
  ) => {
    try {
      const {
        holderAddress = null,
        current = 1,
        pageSize = 25,
      } = request.query;

      if (typeof holderAddress !== "string") {
        return reply
          .status(400)
          .send({ error: "Token ID must be a positive number." });
      }

      if (typeof current !== "string" || current <= 0) {
        return reply
          .status(400)
          .send({ error: "Page must be a positive number." });
      }

      if (typeof pageSize !== "string" || pageSize <= 0) {
        return reply
          .status(400)
          .send({ error: "Limit must be a positive number." });
      }

      const apiUrl = new URL(TAMA_BASE_URL + TamaRouteEnum.GET_TOKEN_HOLDER);
      apiUrl.search = new URLSearchParams({
        holderAddress,
        page: current,
        limit: pageSize,
      }).toString();

      const { data } = await axios.get(apiUrl.toString());

      return { message: "Data fetched successfully!", data };
    } catch (error: any) {
      fastify.log.error(error);

      const status = error.response?.status || 500;
      const errorMessage = error.response?.data?.message || error.message;

      reply.status(status).send({ error: errorMessage });
    }
  }
);

const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server is running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
