import bcrypt from 'bcrypt';

export default class HashService {
    private salt: string|number = 3;

    hash(password: string): Promise<string> {
        return bcrypt.hash(password, this.salt);
    }

    validate(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}