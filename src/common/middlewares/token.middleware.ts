import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response } from 'express';

import { Model, Connection, connections } from 'mongoose';
import { verify } from 'jsonwebtoken';

import { USER_MODEL_TOKEN, SERVER_CONFIG, DB_CONNECTION_TOKEN } from '../../server.constants';
import { IUser } from '../../modules/users/interfaces/user.interface';
import { UserSchema } from '../../modules/users/schemas/user.schema';

import { magenta, green } from 'chalk';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
    private userModel;
    constructor() {
        console.log('Token middleware loaded');
    }
    async use(req, res: Response, next: Function) {
        console.log(magenta('-----------TOKEN MIDDLEWARE IS FIRED------------'));
        console.log(`Tenant is ${req.tenant}`);
        connections.map(connection => {
            console.log('NAME');
            console.log(connection.name);
        });
        const connection: Connection = connections.find(connection => connection.name === req['tenant']);


        this.userModel = await connection.model(USER_MODEL_TOKEN) as Model<IUser>;

        try {
            let users = await this.userModel.find();
            console.log(users);
        } catch (ex) {
            console.log(ex);
        }
        req.user = {};

        let parsedToken = {};

        const token: any = req.headers.authorization || req.headers.Authorization;
        if (token) {
            try {
                parsedToken = verify(token, SERVER_CONFIG.jwtSecret);
                const user: IUser = await this.userModel.findById(parsedToken['_id'])
                    .select('-salt -password -resetPasswordToken -resetPasswordExpired -verificationToken -resetPasswordExpires');
                req.user = user;
            } catch (ex) {
                return res.status(500).send(ex);
            }
        } 
        next();
    }
}
