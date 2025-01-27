import { FastifyReply, FastifyRequest } from "fastify";
import { GeckoService } from "../gecko/gecko.service";
import { autoBindMethods } from "../utils/common";

interface BodyParams {
  addresses: string[];
  network: string;
  include?: string;
}

export class GeckoController {
  private geckoService: GeckoService;

  constructor() {
    this.geckoService = new GeckoService();
    autoBindMethods(this);
  }

  public async getGeckoDetail(
    request: FastifyRequest<{ Body: BodyParams }>,
    reply: FastifyReply
  ) {
    const { addresses, network, include } = request.body;

    if (!addresses.length || !network) {
      return reply
        .status(400)
        .send({ error: "Addresses and network are required." });
    }

    const res = await this.geckoService.fetchMultiTokenOnNetwork(
      { addresses, network, include },
      reply
    );

    return { message: res?.message, data: res?.data.data };
  }
}
