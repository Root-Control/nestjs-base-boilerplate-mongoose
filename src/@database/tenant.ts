import { Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Model, Connection, connections } from 'mongoose';
import { Schema } from 'mongoose';

export class Tenant {
    connection: Connection;
    /**
     *
     */
    constructor(@Inject(REQUEST) private readonly request: Request) {
        //  Hardcoded tenant, request origin should be attached here
        this.connection = connections.find(connection => connection.name === this.request['tenant']);
    }
}

export const TenantToken = 'Tenant';