import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
export const UserType = (type: string) => SetMetadata('type', type);
export const GenericPermissions = (methodName: string) => SetMetadata('permissions', methodName);
