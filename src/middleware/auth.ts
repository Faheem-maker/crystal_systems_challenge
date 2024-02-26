import { FastifyReply, FastifyRequest } from "fastify";
import FastifyApp from "../types/FastifyApp.js";

async function bearerAuth(request: FastifyRequest, reply: FastifyReply, done) {
    if (!request.headers['authorization']) {
        reply.code(401).send({ error: 'Unauthorized' });
        return;
    }
    
    var app: FastifyApp = this;

    var token = request.headers['authorization'];

    if (token.startsWith('Bearer')) {
        token = token.substring(6);
    }

    var user  = await app.auth.validateToken(token.trim());

    if (user == null) {
        reply.code(401).send({ error: 'Unauthorized' });
        return;
    }

    app.user = user;

    done();
};

export default bearerAuth;