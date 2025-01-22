// Import Fastify
import Fastify from "fastify";
// Initialize Fastify
const fastify = Fastify({ logger: true });
// Define a simple API route
fastify.get("/api", async (request, reply) => {
    return { message: "Hello, Fastify with ESModules!" };
});
// Start the server
const start = async () => {
    try {
        await fastify.listen({ port: 3000, host: "0.0.0.0" });
        console.log("Server is running at http://localhost:3000");
    }
    catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};
start();
