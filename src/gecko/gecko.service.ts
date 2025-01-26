import { FastifyReply } from "fastify";
import { CoinGeckoEndpointEnum } from "../types/routes.enum.ts";
import { COIN_GECKO_API_URL, fetchData } from "../utils/common.ts";

export class GeckoService {
  public async fetchMultiTokenOnNetwork(
    requestQuery: any,
    reply: FastifyReply
  ) {
    const { addresses, network, include = "" } = requestQuery;

    const apiUrl = new URL(
      `${COIN_GECKO_API_URL}/networks/${network}${CoinGeckoEndpointEnum.GET_MULTI_TOKEN}/${addresses}`
    );
    apiUrl.search = new URLSearchParams({
      include,
    }).toString();

    return fetchData(apiUrl.toString(), reply);
  }
}
