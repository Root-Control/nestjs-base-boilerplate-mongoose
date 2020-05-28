import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

import { BLOGPOST_MODEL_TOKEN } from '../../server.constants';

import { getErrorMessage } from '../../common/helpers/error-handler';
import { CrudService } from '../../@generics/crud/crud.service';

@Injectable()
export class BlogPostsService<Entity> extends CrudService<Entity> {
    constructor(@Inject('Tenant') private tenant) {
        super(tenant, BLOGPOST_MODEL_TOKEN)
    }

}
