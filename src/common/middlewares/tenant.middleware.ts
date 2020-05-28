import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from 'express';

import { green } from 'chalk';
import { Connection } from 'mongoose';

import { DB_CONNECTION_TOKEN } from '../../server.constants';
import { getDatabaseFromOrigin } from '../helpers/utils';

@Injectable()
export class TenantMiddleware implements NestMiddleware {
    constructor(@Inject(DB_CONNECTION_TOKEN) private readonly connection: Connection) {
        console.log('Tenant Middleware initialized');    
    }
    async use(req: Request, res: Response, next: Function) {
        console.log(green('-----------TENANT MIDDLEWARE IS FIRED------------'));
        //  HARDCODED TENANT HERE
        const database = getDatabaseFromOrigin(req.headers);
        console.log(database);
        console.log(green('HIRO, MMIDDLEWARE TENANNT IS MISSING, YOU SHOULD TEST POSTMAN'));
        req['tenant'] = database;
        console.log( req['tenant']);
        //  console.log('DATABASE -> ' + database);
        next();
    }
}
