import fastify from "fastify";
import helmet from "@fastify/helmet";

/* Types */
import DemoResponse from "./types/DemoResponse.js";

var app = fastify();

app.register(helmet);

app.get('/', DemoResponse, async function home() {
    return {
        success: true,
        path: 'home'
    }
});

try {
    await app.listen({ port: 8000 });
    console.log("Server successfully started on http://localhost:8000");
}
catch (err) {
    console.error("Failed to run server");
    console.error(err);
}