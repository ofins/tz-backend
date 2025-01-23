import axios from "axios";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { RoutesEnum, TamaRouteEnum } from "./types/routes.enum.js";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "@fastify/cors";

const fastify = Fastify({ logger: true });

export const TAMA_BASE_URL = process.env.ENV_TAMA_BASE_URL;

interface QueryParams {
  sortDirection?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
  tokenId?: number;
  searchTerm?: string;
}

interface RouteParams {
  id: string;
}

await fastify.register(cors, {
  origin: true, // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Optional: Define allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Optional: Define allowed headers
});

fastify.get(
  RoutesEnum.GET_TOKENS,
  async (
    request: FastifyRequest<{ Querystring: QueryParams }>,
    reply: FastifyReply
  ) => {
    try {
      const {
        sortDirection = "desc",
        sortBy = "lastFeatured",
        page = 1,
        limit = 25,
        searchTerm = "",
      } = request.query;

      if (typeof page !== "string" || page <= 0) {
        return reply
          .status(400)
          .send({ error: "Page must be a positive number." });
      }

      if (typeof limit !== "string" || limit <= 0) {
        return reply
          .status(400)
          .send({ error: "Limit must be a positive number." });
      }

      const apiUrl = new URL(TAMA_BASE_URL + TamaRouteEnum.GET_TOKENS);
      apiUrl.search = new URLSearchParams({
        sortDirection,
        sortBy,
        page,
        limit,
        searchTerm,
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

fastify.get(
  RoutesEnum.GET_TOKEN,
  async (
    request: FastifyRequest<{ Params: RouteParams }>,
    reply: FastifyReply
  ) => {
    try {
      const { id } = request.params;

      const apiUrl = `${TAMA_BASE_URL}${TamaRouteEnum.GET_TOKENS}/${id}`;

      const { data } = await axios.get(apiUrl);

      return { message: "Data fetched successfully!", data };
    } catch (error: any) {
      fastify.log.error(error);

      const status = error.response?.status || 500;
      const errorMessage = error.response?.data?.message || error.message;

      reply.status(status).send({ error: errorMessage });
    }
  }
);

fastify.get(
  RoutesEnum.GET_TRADES,
  async (
    request: FastifyRequest<{ Querystring: QueryParams }>,
    reply: FastifyReply
  ) => {
    try {
      const { tokenId = null, page = 1, limit = 25 } = request.query;

      if (typeof tokenId !== "string" || tokenId <= 0) {
        return reply
          .status(400)
          .send({ error: "Token ID must be a positive number." });
      }

      if (typeof page !== "string" || page <= 0) {
        return reply
          .status(400)
          .send({ error: "Page must be a positive number." });
      }

      if (typeof limit !== "string" || limit <= 0) {
        return reply
          .status(400)
          .send({ error: "Limit must be a positive number." });
      }

      const apiUrl = new URL(TAMA_BASE_URL + TamaRouteEnum.GET_TRADES);
      apiUrl.search = new URLSearchParams({
        tokenId,
        page,
        limit,
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
