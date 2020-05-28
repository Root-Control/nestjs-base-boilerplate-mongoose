import { IPagination } from './pagination/pagination';
import { QueryFindOptions, QueryFindBaseOptions, QueryFindOneAndUpdateOptions, QueryFindOneAndRemoveOptions, Types } from 'mongoose';

export interface ICrudService<Entity> {
  create(model: Entity): Promise<Entity>;
  findAll(query): Promise<IPagination<Entity>>;
  findById(id: Types.ObjectId): Promise<Entity>;
  findOne(conditions): Promise<Entity>;
  findOneAndUpdate(id: Types.ObjectId, newModel: Entity): Promise<any>;
  findOneAndDelete(id: Types.ObjectId): Promise<any>;
}

export interface ICrudServicePermissionRoles {
	findAll: string[],
	findById: string[],
	findOne: string[]
	create: string[],
	findOneAndUpdate: string[],
	findOneAndDelete: string[]
}