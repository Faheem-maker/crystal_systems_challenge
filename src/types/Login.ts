import { RouteShorthandOptions } from "fastify";

var LoginSchema: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['username', 'password'],
            properties: {
                username: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                }
            }
        }
    }
}

export default LoginSchema;