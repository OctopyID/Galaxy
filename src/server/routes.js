import crypto from "crypto";
import { readData, writeData } from "./db.js";

async function routes(fastify, options) {
  // GET /services
  fastify.get("/services", async (request, reply) => {
    const data = await readData();
    return data.services;
  });

  // POST /services
  fastify.post("/services", async (request, reply) => {
    const newService = request.body;

    // Simple validation
    if (!newService.name || !newService.url) {
      return reply.code(400).send({ error: "Name and URL are required" });
    }

    const data = await readData();

    // Generate ID if not provided
    if (!newService.id) {
      newService.id = crypto.randomUUID();
    }

    data.services.push(newService);
    await writeData(data);

    return reply.code(201).send(newService);
  });

  // PUT /services/:id
  fastify.put("/services/:id", async (request, reply) => {
    const { id } = request.params;
    const updatedFields = request.body;
    
    const data = await readData();
    const index = data.services.findIndex((s) => s.id === id);

    if (index === -1) {
      return reply.code(404).send({ error: "Service not found" });
    }

    // Merge existing service with updates
    const updatedService = { ...data.services[index], ...updatedFields };
    data.services[index] = updatedService;

    await writeData(data);
    return updatedService;
  });

  // DELETE /services/:id
  fastify.delete("/services/:id", async (request, reply) => {
    const { id } = request.params;
    const data = await readData();

    const initialLength = data.services.length;
    data.services = data.services.filter((service) => service.id !== id);

    if (data.services.length === initialLength) {
      return reply.code(404).send({ error: "Service not found" });
    }

    await writeData(data);
    return { success: true };
  });
}

export default routes;
