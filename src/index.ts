import fastify from "fastify";
import helmet from "@fastify/helmet";

/* Types */
import DemoResponse from "./types/DemoResponse.js";

/* Application Imports */
import DatabaseService from "./services/DatabaseService.js";
import FastifyApp from "./types/FastifyApp.js";
import AuthService from "./services/AuthService.js";
import HashService from "./services/HashService.js";

/* Import Routers */
import AccountsRouter from './routes/accounts.js';

import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';

var app: FastifyApp = fastify();

app.register(swagger, {
    routePrefix: '/swagger',
    swagger: {
        host: 'localhost',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    exposeRoute: true,
});

app.register(swaggerUI, {
    routePrefix: '/swagger',
    exposeRoute: true
})

app.register(helmet);

app.register(AccountsRouter, { prefix: '/accounts' });

/* Include Services */
let db = new DatabaseService();
let auth = new AuthService(db, new HashService());

app.decorate('db', db);
app.decorate('auth', auth);

/* End Include Services*/

app.get('/', DemoResponse, async function home() {
    return {
        success: true,
        path: 'home'
    }
});

try {
    await app.listen({ port: 8000 });

    app.swagger();
    console.log("Server successfully started on http://localhost:8000");
}
catch (err) {
    console.error("Failed to run server");
    console.error(err);
}