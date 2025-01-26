export enum TamaRouteEnum {
  GET_TOKENS = "/tokens",
  GET_TRADES = "/trades",
  GET_TOKEN_HOLDER = "/tokenHolders",
}

export enum CoinGeckoEndpointEnum {
  GET_MULTI_TOKEN = "/tokens/multi",
}

export enum RoutesEnum {
  GET_TOKENS = "/v1/services/tokens",
  GET_TOKEN = "/v1/services/tokens/:id",

  GET_TRADES = "/v1/services/trades",

  GET_TOKEN_HOLDER = "/v1/services/tokenHolders",

  // CoinGecko
  GET_GECKO = "/v1/services/gecko/tokens",
}
