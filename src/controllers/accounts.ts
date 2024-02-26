import { FastifyReply } from "fastify";
import FastifyApp from "../types/FastifyApp.js";
import jwt from 'jsonwebtoken';

import Validation from "../helpers/Validation.js";

async function login(request: any, reply: FastifyReply) {
    var app: FastifyApp = this; // Accessing Fastify instance

    var { username, password } = request.body;

    try {
        var user = await app.auth.login(username, password);

        return {
            token: app.auth.generateToken(user),
            success: true,
        };
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

async function register(request: any, reply: FastifyReply) {
    var { first_name, last_name, email, phone, password, birthday } = request.body;

    if (typeof birthday == 'string') {
        birthday = new Date(Date.parse(birthday));
    }

    // Perform validation
    if (!Validation.validateEmail(email))
        return Validation.returnValidationError(reply, "Please enter a valid email");
    
    let error = Validation.validatePassword(password)
    if (error !== true)
        return Validation.returnValidationError(reply, error as string);
    if (Validation.validateLength(first_name, 6, 100))
        return Validation.returnValidationError(reply, 'First name must be between 6 to 100 characters');
    if (Validation.validateLength(last_name, 6, 100))
        return Validation.returnValidationError(reply, 'Last name must be between 6 to 100 characters');
    if (Validation.validateLength(phone, 9, 16))
        return Validation.returnValidationError(reply, "Phone must be between 9 to 16 characters");

    var app: FastifyApp = this;

    await app.auth.addAccount({
        first_name,
        last_name,
        email,
        phone,
        password,
        birthday,
    });

    return reply.send({
        success: true,
    });
}

function profile() {
    var app: FastifyApp = this;

    return {
        name: app.user.first_name + " " + app.user.last_name,
        email: app.user.email,
        phone: app.user.phone,
        birthday: app.user.birthday,
        created_at: app.user.created_at,
        last_modified: app.user.modified_at,
    };
}

function deleteUser() {
    var app: FastifyApp = this;

    app.auth.deleteUser(app.user);

    return {
        success: true,
    }
}

async function updateUser(request: any, reply: FastifyReply) {
    var app: FastifyApp = this;
    var { first_name, last_name, email, phone, birthday, } = request.body;

    await app.auth.updateUser(app.user.id, { first_name, last_name, email, phone, birthday, password: undefined });

    return {
        success: true,
    }
}

export { login, register, profile, deleteUser, updateUser };