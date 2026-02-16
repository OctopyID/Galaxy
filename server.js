import Fastify from "fastify";
import cors from "@fastify/cors";
import serviceRoutes from "./src/server/routes.js";

const fastify = Fastify({
  logger: true,
});

import fastifyStatic from "@fastify/static";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Register CORS
fastify.register(cors, {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
});

// Register Static files (for serving built frontend)
fastify.register(fastifyStatic, {
  root: path.join(__dirname, "dist"),
  prefix: "/",
});

// Register Routes
fastify.register(serviceRoutes);

// Catch-all route to serve index.html for SPA routing
fastify.setNotFoundHandler((request, reply) => {
  reply.sendFile("index.html");
});

const start = async () => {
  try {
    const PORT = process.env.PORT || 1337;
    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
