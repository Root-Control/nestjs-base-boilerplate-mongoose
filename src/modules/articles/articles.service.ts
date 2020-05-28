import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model } from 'mongoose';

import { ARTICLE_MODEL_TOKEN } from '../../server.constants';

import { getErrorMessage } from '../../common/helpers/error-handler';
import { CrudService } from '../../@generics/crud/crud.service';

@Injectable()
export class ArticlesService<Entity> extends CrudService<Entity> {
	articleModel;
    constructor(@Inject('Tenant') private tenant) {
        super(tenant, ARTICLE_MODEL_TOKEN)
        this.articleModel = tenant.connection.model(ARTICLE_MODEL_TOKEN);
    }

    async findAllPaginated(query, { skip, limit }) {
        try {
            return await this.articleModel.find(query).skip(skip).limit(limit).lean();
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

}
