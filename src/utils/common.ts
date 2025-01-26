import { FastifyReply } from "fastify";

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
