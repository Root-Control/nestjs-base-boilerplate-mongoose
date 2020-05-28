import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { DatabaseModule } from '../../@database';
import { BlogPostsController } from './blogposts.controller';
import { blogpostProviders } from './blogposts.providers';
import { BlogPostsService } from './blogposts.service';

import { blogPostGenericPermissions } from '../../@generics/generic-permissions/blogposts';

@Module({
    imports: [DatabaseModule],
    controllers: [BlogPostsController],
    providers: [
        ...blogpostProviders,
        BlogPostsService
    ],
    exports: [
        ...blogpostProviders
    ]
})
export class BlogPostsModule implements NestModule {
    protected isGeneric: boolean = false;
    constructor() {
        console.log('BlogPosts module loaded');
    }
    public configure(consumer: MiddlewareConsumer) {
        this.isGeneric = true;
        consumer
            .apply((req, res, next) => {
                if (this.isGeneric) {
                    req.isGeneric = true;
                    req.genericPermissions = blogPostGenericPermissions;
                }
                next();
            }).forRoutes({ path: 'blogposts', method: RequestMethod.ALL });
    }
}