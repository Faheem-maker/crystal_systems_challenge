import { Account } from '@prisma/client';
import DatabaseService from './DatabaseService.js';
import HashService from './HashService.js';

export default class AuthService {
    private db: DatabaseService;
    private hash: HashService;

    constructor(db: DatabaseService, hash: HashService) {
        this.db = db;
        this.hash = hash;
    }

    async login(username, password): Promise<Account> {
        var user = await this.db.db.account.findFirstOrThrow({
            where: {
                email: username,
            }
        });

        if (this.hash.validate(password, user.password)) {
            return user;
        }
        
        throw new Error("Invalid username or password");
    }
}