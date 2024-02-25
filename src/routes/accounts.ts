import { FastifyInstance, FastifyPluginOptions } from "fastify";

// Controllers
import { login, register } from "../controllers/accounts.js";

// Types
import LoginSchema from "../types/Login.js";

export default async function AccountsRoutes(app: FastifyInstance, opts: FastifyPluginOptions) {
    app.post('/login', LoginSchema, login);

    app.post('/register', register);
}