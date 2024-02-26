import { RouteShorthandOptions } from "fastify";
import bearerAuth from "../middleware/auth.js";

var Updateschema: RouteShorthandOptions = {
    preHandler: bearerAuth,
    schema: {
        body: {
            type: 'object',
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

export default Updateschema;