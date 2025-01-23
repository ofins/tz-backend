import axios from "axios";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { RoutesEnum, TamaRouteEnum } from "./types/routes.enum.js";

const fastify = Fastify({ logger: true });

export const TAMA_BASE_URL = "https://tama.meme/api";

interface QueryParams {
  sortDirection?: string;
  sortBy?: string;
  page?: number;
  limit?: number;
}

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
      } = request.query;

      if (typeof page !== "number" || page <= 0) {
        return reply
          .status(400)
          .send({ error: "Page must be a positive number." });
      }

      if (typeof limit !== "number" || limit <= 0) {
        return reply
          .status(400)
          .send({ error: "Limit must be a positive number." });
      }

      const apiUrl = `${TAMA_BASE_URL}${TamaRouteEnum.GET_TOKENS}?sortDirection=${sortDirection}&sortBy=${sortBy}&page=${page}&limit=${limit}`;

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
