import { FastifyReply } from "fastify";
import { CoinGeckoEndpointEnum } from "../types/routes.enum";
import { COIN_GECKO_API_URL, fetchData } from "../utils/common";

interface RequestQueryParams {
  addresses: string[];
  network: string;
  include?: string;
}

export class GeckoService {
  public async fetchMultiTokenOnNetwork(
    requestQuery: RequestQueryParams,
    reply: FastifyReply
  ) {
    const { addresses, network, include = "" } = requestQuery;

    const apiUrl = new URL(
      `${COIN_GECKO_API_URL}/networks/${network}${
        CoinGeckoEndpointEnum.GET_MULTI_TOKEN
      }/${addresses.join(",")}`
    );
    apiUrl.search = new URLSearchParams({
      include,
    }).toString();

    return fetchData(apiUrl.toString(), reply);
  }
}
