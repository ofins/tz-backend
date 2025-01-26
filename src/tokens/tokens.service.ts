import axios from "axios";
import { FastifyReply } from "fastify";
import { TamaRouteEnum } from "../types/routes.enum.ts";
import { TAMA_BASE_URL } from "../utils/common.ts";

const fetchData = async (apiUrl: string, reply: FastifyReply) => {
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

export class TokensService {
  public async fetchTokensBySearchTerm(requestQuery: any, reply: FastifyReply) {
    const { sortDirection, sortBy, current, pageSize, searchTerm } =
      requestQuery;

    const apiUrl = new URL(TAMA_BASE_URL + TamaRouteEnum.GET_TOKENS);
    apiUrl.search = new URLSearchParams({
      sortDirection,
      sortBy,
      page: String(current),
      limit: String(pageSize),
      searchTerm,
    }).toString();
    return fetchData(apiUrl.toString(), reply);
  }

  public async fetchTokenList(id: string, reply: FastifyReply) {
    const apiUrl = `${TAMA_BASE_URL}${TamaRouteEnum.GET_TOKENS}/${id}`;
    return fetchData(apiUrl, reply);
  }

  public async fetchTokenHolder(requestQuery: any, reply: FastifyReply) {
    const { holderAddress, current, pageSize } = requestQuery;

    const apiUrl = new URL(TAMA_BASE_URL + TamaRouteEnum.GET_TOKEN_HOLDER);
    apiUrl.search = new URLSearchParams({
      holderAddress,
      page: String(current),
      limit: String(pageSize),
    }).toString();
    return fetchData(apiUrl.toString(), reply);
  }

  public async fetchTrades(requestQuery: any, reply: FastifyReply) {
    const { tokenId, current, pageSize } = requestQuery;

    const apiUrl = new URL(TAMA_BASE_URL + TamaRouteEnum.GET_TRADES);
    apiUrl.search = new URLSearchParams({
      tokenId,
      page: String(current),
      limit: String(pageSize),
    }).toString();
    return fetchData(apiUrl.toString(), reply);
  }
}
