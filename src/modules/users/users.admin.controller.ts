import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    Req,
    UseGuards,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { UserService } from './users.service';

// Guards
import { RolesGuard } from '../../@security/guards/app.guards';
import { Roles } from '../../@security/decorators/app.decorators';

import { MulterConfig } from '../../config/multer';

@Controller('users')
@UseGuards(RolesGuard)
export class UsersAdminController {
    constructor(private readonly userService: UserService) { }
    /* --------------------------------------------------------------------
      Module     : Users
      Controller : User Admin Controller
      ---------------------------------------------------------------------
      Description :

      Aditional information: All role routes are working with Guards, and Guards
      are defining the current req.user value.

      Middleware description:

      Route:
      /api/users
     ----------------------------------------------------------------------*/

    /*
      Route:        GET api/users
      Roles:        user, admin, superadmin
      Description:  Get all users in database.
    */
    @Get()
    @Roles('admin')
    async getUsers(@Req() req) {
        const query = req.query;
        console.log('b');
        return await this.userService.getUsers(query);
    }

    /*
      Route:        GET api/users/userId
      Roles:        user, admin
      Description:  Get user by provided Id.
    */

    @Get(':userId')
    @Roles('admin')
    async getUserById(@Req() req) {
        const user = req.model;
        return user;
    }

    /*
      Route:        PUT api/users/:userId
      Roles:        user, admin
      Description:  Get user by provided Id.
    */

    @Put(':userId')
    @Roles('admin')
    async updateUserById(@Req() req) {
        const user = await this.userService.updateUser(req.model, req.body);
        return user;
    }

    /*
      Route:        DELETE api/users
      Roles:        admin, superadmin
      Description:  Delete user provide by id.
    */

    @Delete(':userId')
    @Roles('admin')
    async deleteUser(@Req() req) {
        const user = req.model;
        return await this.userService.deleteUser(user);
    }
}
