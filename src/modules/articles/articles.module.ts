import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../@database';
import { ArticlesController } from './articles.controller';
import { articleProviders } from './articles.providers';
import { ArticlesService } from './articles.service';

import { articleGenericPermissions } from '../../@generics/generic-permissions/articles';

@Module({
    imports: [DatabaseModule],
    controllers: [ArticlesController],
    providers: [
        ...articleProviders,
        ArticlesService
    ],
    exports: [
        ...articleProviders
    ]
})
export class ArticlesModule implements NestModule {
    protected isGeneric: boolean = false;
    public configure(consumer: MiddlewareConsumer) {
        this.isGeneric = true;
        consumer
            .apply((req, res, next) => {
                if (this.isGeneric) {
                    req.isGeneric = true;
                    req.genericPermissions = articleGenericPermissions;
                }
                next();
            }).forRoutes({ path: 'articles', method: RequestMethod.ALL });
        //  users id calling middleware for findById users before run another methods like "delete/update/read"
    }
}