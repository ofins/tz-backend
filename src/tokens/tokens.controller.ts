import { FastifyReply, FastifyRequest } from "fastify";
import { RouteParams } from "../types/common.types.ts";
import { QueryParams } from "../types/tama.types.ts";
import { autoBindMethods, validatePaginationParams } from "../utils/common.ts";
import { TokensService } from "./tokens.service.ts";

export class TokensController {
  private tokensService: TokensService;

  constructor() {
    this.tokensService = new TokensService();
    autoBindMethods(this);
  }

  public async getTokenDetail(
    request: FastifyRequest<{ Params: RouteParams }>,
    reply: FastifyReply
  ) {
    const { id } = request.params;
    return await this.tokensService.fetchTokenDetail(id, reply);
  }

  public async getTokenList(
    request: FastifyRequest<{ Querystring: QueryParams }>,
    reply: FastifyReply
  ) {
    const {
      sortDirection = "desc",
      sortBy = "lastFeatured",
      current = 1,
      pageSize = 25,
      searchTerm = "",
    } = request.query;

    if (!validatePaginationParams(current, pageSize, reply)) return;

    return await this.tokensService.fetchTokenList(
      { sortDirection, sortBy, current, pageSize, searchTerm },
      reply
    );
  }

  public async getTokenHolder(
    request: FastifyRequest<{ Querystring: QueryParams }>,
    reply: FastifyReply
  ) {
    const { holderAddress = "", current = 1, pageSize = 20 } = request.query;

    if (typeof holderAddress !== "string") {
      return reply
        .status(400)
        .send({ error: "Token ID must be a positive number." });
    }

    if (!validatePaginationParams(current, pageSize, reply)) return;

    return await this.tokensService.fetchTokenHolder(
      { holderAddress, current, pageSize },
      reply
    );
  }

  public async getTrades(
    request: FastifyRequest<{ Querystring: QueryParams }>,
    reply: FastifyReply
  ) {
    const { tokenId = null, current = 1, pageSize = 25 } = request.query;

    if (typeof tokenId !== "string" || +tokenId <= 0) {
      return reply
        .status(400)
        .send({ error: "Token ID must be a positive number." });
    }

    if (!validatePaginationParams(current, pageSize, reply)) return;

    return await this.tokensService.fetchTrades(
      { tokenId, current, pageSize },
      reply
    );
  }
}
