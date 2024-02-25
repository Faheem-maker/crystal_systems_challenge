import { RouteShorthandOptions } from "fastify";

var DemoResponse: RouteShorthandOptions = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean'
                    },
                    message: {
                        type: 'boolean'
                    },
                }
            }
        }
    }
};

export default DemoResponse;