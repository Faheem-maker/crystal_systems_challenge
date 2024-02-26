import { RouteShorthandOptions } from "fastify";

var RegisterSchema: RouteShorthandOptions = {
    schema: {
        body: {
            type: 'object',
            required: ['first_name', 'last_name', 'email', 'phone', 'password', 'birthday'],
            properties: {
                first_name: {
                    type: 'string'
                },
                last_name: {
                    type: 'string'
                },
                email: {
                    type: 'string'
                },
                phone: {
                    type: 'string'
                },
                password: {
                    type: 'string'
                },
                birthday: {
                    type: 'string'
                },
            }
        }
    }
}

export default RegisterSchema;