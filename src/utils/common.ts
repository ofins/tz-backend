import axios from "axios";
import * as dotenv from "dotenv";
import { FastifyReply } from "fastify";

dotenv.config();

export const TAMA_BASE_URL = process.env.ENV_TAMA_BASE_URL;
export const COIN_GECKO_API_URL = process.env.ENV_COINGECKO_URL;

export function autoBindMethods(
  instance: any,
  exclude: string[] = ["constructor"]
) {
  const proto = Object.getPrototypeOf(instance);

  Object.getOwnPropertyNames(proto).forEach((method) => {
    if (!exclude.includes(method) && typeof instance[method] === "function") {
      instance[method] = instance[method].bind(instance);
    }
  });
}

export const validatePaginationParams = (
  current: number,
  pageSize: number,
  reply: FastifyReply
) => {
  if (+current <= 0 || +pageSize <= 0) {
    reply
      .status(400)
      .send({ error: "Page and limit must be a positive number." });
    return false;
  }
  return true;
};

export const fetchData = async (apiUrl: string, reply: FastifyReply) => {
  try {
    const { data } = await axios.get(apiUrl);
    return { message: "Data fetched successfully!", data };
  } catch (error: any) {
    reply.log.error(error);
    const status = error.response?.status || 500;
    const errorMessage = error.response?.data?.message || error.message;
    reply.status(status).send({ error: errorMessage });
  }
};
