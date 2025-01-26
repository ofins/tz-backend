import cors from "@fastify/cors";
import Fastify from "fastify";
import pino from "pino";
import { stream } from "./config/common.ts";
import { tokensRoute } from "./tokens/tokens.route.ts";

const fastify = Fastify({
  logger: pino.default(
    {
      level: "info",
      formatters: {
        level: (label) => {
          return { level: label.toUpperCase() };
        },
      },
    },
    stream
  ),
});

const init = async () => {
  await fastify.register(cors, {
    origin: true, // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Optional: Define allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Optional: Define allowed headers
  });

  await fastify.register(tokensRoute);

  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server is running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

init();
