import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../@database';
import { UsersController } from './users.controller';
import { UsersAdminController } from './users.admin.controller';
import { userProviders } from './users.providers';
import { UserService } from './users.service';

import { UserByIdMiddleware } from './middlewares/userbyId.middleware';
//  Middlewares

@Module({
    imports: [DatabaseModule],
    controllers: [UsersController, UsersAdminController],
    providers: [
        ...userProviders,
        UserService
    ],
    exports: [
        ...userProviders
    ]
})
export class UsersModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
                .apply(UserByIdMiddleware)
                .forRoutes({ path: 'users/:userId', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}
