import { FastifyReply, FastifyRequest } from "fastify";
import { autoBindMethods } from "../utils/common.ts";
import { GeckoService } from "./gecko.service.ts";

interface BodyParams {
  addresses?: string;
  network?: string;
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

    const res = await this.geckoService.fetchMultiTokenOnNetwork(
      { addresses, network, include },
      reply
    );

    return { message: res?.message, data: res?.data.data };
  }
}
