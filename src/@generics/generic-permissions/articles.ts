import { ICrudServicePermissionRoles } from '../../@generics/crud/crud.interface';
import { Permissions } from './permissions.enum';

export const articleGenericPermissions: ICrudServicePermissionRoles = {
    findAll: [Permissions.ALL],
    findById: [],
    findOne: [],
    create: [],
    findOneAndUpdate: [],
    findOneAndDelete: []
};