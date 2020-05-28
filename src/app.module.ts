import { Module, NestModule, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// Modules
import { ArticlesModule } from './modules/articles';
import { BlogPostsModule } from './modules/blogposts';
import { UsersModule } from './modules/users';


//  Database import
import { DatabaseModule } from './@database';

//  Gateway sockets
import { LoggerMiddleware } from './common/middlewares/logger.middleware';
import { TenantMiddleware } from './common/middlewares/tenant.middleware';
import { TokenMiddleware } from './common/middlewares/token.middleware';


@Module({
  imports: [
    DatabaseModule,
    ArticlesModule,
    BlogPostsModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
  exports: []
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer
                .apply(TenantMiddleware, LoggerMiddleware)
                .forRoutes('*');

        consumer.apply(TokenMiddleware)
                .exclude({
                    path: 'auth/local/signin',
                    method: RequestMethod.POST
                }, {
                    path: 'auth/local/signup',
                    method: RequestMethod.POST
                })
                .forRoutes('*');
    }
}

