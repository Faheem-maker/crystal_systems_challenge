import { FastifyReply } from "fastify";

class ValidationHelper {
    static validateEmail(email: string): boolean {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    static validatePassword(pass: string): boolean|string {
        if (pass.length < 8)
            return 'Your password must be at least 8 characters';
        else if (pass.search(/[a-z]/i) < 0)
            return 'Your password must contain at least one letter.';
        else if (pass.search(/[0-9]/) < 0)
            return 'Your password must contain at least one digit.';

        return true;
    }

    static validateLength(str: string, min: number, max: number) {
        return str.length <= min && str.length >= max;
    }

    static returnValidationError(reply: FastifyReply, err: string) {
        return reply.status(400).send({
            "error": "Bad Request",
            "message": err
        });
    }
}

export default ValidationHelper;