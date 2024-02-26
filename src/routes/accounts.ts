import { FastifyInstance, FastifyPluginOptions } from "fastify";

// Controllers
import { login, register, profile, deleteUser, updateUser } from "../controllers/accounts.js";

// Types
import LoginSchema from "../types/Login.js";
import bearerAuth from "../middleware/auth.js";
import Updateschema from "../types/UpdateUser.js";

export default async function AccountsRoutes(app: FastifyInstance, opts: FastifyPluginOptions) {
    app.post('/login', LoginSchema, login);

    app.post('/register', register);

    app.get("/", { preHandler: bearerAuth }, profile);
    app.patch("/", Updateschema, updateUser);
    app.delete("/", { preHandler: bearerAuth }, deleteUser );
}