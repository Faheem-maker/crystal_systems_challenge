import { Account, Prisma } from '@prisma/client';
import DatabaseService from './DatabaseService.js';
import HashService from './HashService.js';
import AccountDTO from '../types/AccountDTO.js';

import jwt from 'jsonwebtoken';

export default class AuthService {
    private db: DatabaseService;
    private hash: HashService;
    private key: string = 'hsdjffhewehr3w';

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

    async addAccount(account: AccountDTO) {
        account.password = await this.hash.hash(account.password);

        await this.db.db.account.create({
            data: {
                ...account,
                created_at: new Date(),
                modified_at: new Date(),
            }
        });
    }

    generateToken(user: Account) {
        return jwt.sign(JSON.stringify({
            id: user.id,
            iss: Date.now(),
            provider: 'fastify_app',
            exp: Date.now() + (1000 * 60 * 60 * 24) // 24 hours
        }), this.key);
    }

    async validateToken(token: string) {
        var result: any = jwt.verify(token, this.key);

        if (result.id == null) {
            return null;
        }

        var user = await this.db.db.account.findFirst({
            where: { id: result.id, }
        });

        return user;
    }

    async deleteUser(user: Account) {
        await this.db.db.account.delete({
            where: { id: user.id }
        });
    }

    async updateUser(id: number, user: AccountDTO) {
        await this.db.db.account.update({
            where: {
                id,
            },
            data: {
                ...user,
                modified_at: new Date(),
            },
        });
    }
}