import { Injectable, CanActivate, ExecutionContext, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permissions } from '../../@generics/generic-permissions/permissions.enum';
import { Roles } from '../../modules/users/interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        console.log('verificando guard de roles');
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles || roles[0] === '' || roles[0] === 'all') {
            return true;
        }
        const req = context.switchToHttp().getRequest();
        const user = req.user;
        const hasRole = () => user['roles'].some((role: string) => {
            return roles.includes(role);
        });
        console.log('Role is');
        console.log(user['roles']);
        return user && user['roles'] && hasRole();
    }
}


@Injectable()
export class UserTypeGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const type = this.reflector.get<string[]>('type', context.getHandler());
        if (!type) {
            console.log('Type is not defined in decorator, we will proceed');
            return true;
        }

        const req = context.switchToHttp().getRequest();
        const user = req.user;

        const hasType = () => user.userType === type;
        const isAdmin = () => user['roles'] === ['admin'];
        
        if(isAdmin() || user && user.userType && hasType()) {
            return true;
        } else {
            throw new HttpException('Operation not allowed, you are not an ' + type, HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }
}

@Injectable()
export class GenericPermissionRolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
    }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const methodName = this.reflector.get<string>('permissions', context.getHandler());
        const req = context.switchToHttp().getRequest();

        /**
         *  Generic permissions is comming from the module, check articles.module declaration as example
         */
        if (req.isGeneric) {
            const genericPermissions = req.genericPermissions;
            const path = req.path;
            if (!genericPermissions) {
                throw new HttpException(`${path} module is generic, you should add the generic permissions in the module`, HttpStatus.UNPROCESSABLE_ENTITY);
                return false;
            }
            const allowedRoles = req.genericPermissions[methodName];
            if (!allowedRoles || !allowedRoles.length) {
                //  Allowed roles does not exists or have not length
                //  Passed
                return true;
            }
            
            const role = Roles.USER;
            
            return allowedRoles.includes(role) || allowedRoles.includes(Permissions.ALL);
        } else {
            return true;
        }
        
    }
}