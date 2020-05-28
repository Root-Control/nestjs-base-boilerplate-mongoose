import {
    Controller,
    Post,
    Get,
    Put,
    Patch,
    Delete,
    Param,
    UseGuards,
    Inject,
    Req
} from '@nestjs/common';

import { BlogPostsService } from './blogposts.service';

// Guards
import { RolesGuard, UserTypeGuard } from '../../@security/guards/app.guards';
import { Roles, UserType } from '../../@security/decorators/app.decorators';
import { CrudController } from '../../@generics/crud/crud.controller';
import { IBlogPost } from './interfaces/blogpost.interface';

@Controller('blogposts')
@UseGuards(RolesGuard, UserTypeGuard)
export class BlogPostsController extends CrudController<IBlogPost> {
    constructor(private readonly blogpostsService: BlogPostsService<IBlogPost>) {
        super(blogpostsService)
    }
}
