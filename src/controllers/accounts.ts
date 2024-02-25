import { FastifyReply } from "fastify";
import FastifyApp from "../types/FastifyApp.js";
import jwt from 'jsonwebtoken';

async function login(request: any, reply: FastifyReply) {
    var app: FastifyApp = this; // Accessing Fastify instance

    var { username, password } = request.body;

    try {
        var user = await app.auth.login(username, password);

        return jwt.sign({
            id: user.id,
            issd: Date.now(),
        }, 'hsdjffhewehr3w');
    }
    catch (ex) {
        reply.statusCode = 401;
        reply.send({
            success: false,
            msg: 'Invalid username / password',
            err: ex.message,
        });
    }
}

async function register() {

}

export { login, register };