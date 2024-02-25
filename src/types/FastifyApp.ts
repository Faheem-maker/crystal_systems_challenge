import { FastifyInstance } from "fastify";
import AuthService from "../services/AuthService.js";
import DatabaseService from "../services/DatabaseService.js";

export default interface CustomFastifyInstance extends FastifyInstance {
    db: DatabaseService;
    auth: AuthService;
}