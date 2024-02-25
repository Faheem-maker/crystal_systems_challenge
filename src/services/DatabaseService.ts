import { PrismaClient } from "@prisma/client";

export default class DatabaseService {
    private _db: PrismaClient;

    get db(): PrismaClient {
        if (this._db == null) {
            this._db = new PrismaClient();
        }
        return this._db;
    }

    constructor(opts: any = null) {
        if (opts != null && !opts.lazyInit) {
            this._db = new PrismaClient();
        }
    }
}