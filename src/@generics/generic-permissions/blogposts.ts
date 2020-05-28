import { ICrudServicePermissionRoles } from '../../@generics/crud/crud.interface';

export const blogPostGenericPermissions: ICrudServicePermissionRoles = {
    findAll: ['admin'],
    findById: ['user'],
    findOne: [],
    create: ['admin'],
    findOneAndUpdate: [],
    findOneAndDelete: []
};