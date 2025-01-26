import { FastifyReply } from "fastify";
import { TamaRouteEnum } from "../types/routes.enum.ts";
import { fetchData, TAMA_BASE_URL } from "../utils/common.ts";

export class TokensService {
  public async fetchTokenList(requestQuery: any, reply: FastifyReply) {
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

  public async fetchTokenDetail(id: string, reply: FastifyReply) {
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
