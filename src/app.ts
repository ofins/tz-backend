// Import Fastify
import Fastify from "fastify";

// Import fetch (available natively in Node.js 18+; for older versions, use `node-fetch`)
// import fetch from "node-fetch"; // Install via: npm install node-fetch if needed

// Initialize Fastify
const fastify = Fastify({ logger: true });

// Define a simple API route
fastify.get("/api", async (request, reply) => {
  try {
    // Make a GET request to the external API
    const response = await fetch(
      "https://tama.meme/api/tokens?sortDirection=desc&sortBy=lastFeatured&page=1&limit=12"
    );

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`External API error: ${response.statusText}`);
    }

    // Parse the response JSON
    const data = await response.json();

    // Return the data from the external API
    return { message: "Data fetched successfully!", data };
  } catch (error) {
    // Log and return the error
    fastify.log.error(error);
    reply.status(500).send({ error: "Failed to fetch data from external API" });
  }
});

// Start the server
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: "0.0.0.0" });
    console.log("Server is running at http://localhost:3000");
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
