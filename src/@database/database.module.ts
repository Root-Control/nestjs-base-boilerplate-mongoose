import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { Tenant, TenantToken } from './tenant';

const tenantProvider = {
    provide: TenantToken,
    useClass: Tenant
};

@Module({
    providers: [...databaseProviders, tenantProvider],
    exports: [...databaseProviders, tenantProvider],
})
export class DatabaseModule { }
