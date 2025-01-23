import axios from "axios";
import Fastify from "fastify";
const fastify = Fastify({ logger: true });
fastify.get("/api", async (request, reply) => {
    try {
        const { data } = await axios.get("https://tama.meme/api/tokens?sortDirection=desc&sortBy=lastFeatured&page=1&limit=12");
        return { message: "Data fetched successfully!", data };
    }
    catch (error) {
        fastify.log.error(error);
        const status = error.response?.status || 500;
        const errorMessage = error.response?.data?.message || error.message;
        reply.status(status).send({ error: errorMessage });
    }
});
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
