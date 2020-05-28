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
import { RolesGuard, UserTypeGuard } from '../../@security/guards/app.guards';
import { Roles, UserType } from '../../@security/decorators/app.decorators';

import { MulterConfig } from '../../config/multer';

@Controller('users')
@UseGuards(RolesGuard, UserTypeGuard)
export class UsersController {
    constructor(private readonly userService: UserService) { }
    /* --------------------------------------------------------------------
      Module     : Users
      Controller : User Controller
      ---------------------------------------------------------------------
      Description :

      Aditional information: All role routes are working with Guards, and Guards
      are defining the current req.user value.

      Middleware description:

      Route:
      /api/users
     ----------------------------------------------------------------------*/

    /*
      Route:        GET api/users/me
      Roles:        user, admin
      Description:  Get the current session user information based in authenticated token.
    */

    @Get('me')
    @Roles('user', 'admin')
    async me(@Req() req) {
        return await this.userService.me(req.user);
    }

    /*
      Route:        PUT api/users/upload
      Roles:        user, admin
      Description:  Get user by provided Id.
    */

    @Put('upload')
    @Roles('user', 'admin')
    @UseInterceptors(FileInterceptor('file', MulterConfig))
    async uploadFile(@UploadedFile() file, @Req() req) {
        const user = req.user;
        return await this.userService.updateProfileImage(user, file);
    }

    /*
      Route:        PUT api/users/:id
      Roles:        user, admin
      Description:  Get user by provided Id.
    */

    @Put('')
    @Roles('user', 'admin')
    async updateUser(@Req() req) {
      console.log('update user controller called');
        return await this.userService.updateUser(req.user, req.body);
    }

    /*
      Route:        PUT api/users/:id
      Roles:        user, admin
      Description:  Get user by provided Id.
    */

    @Put('password-change')
    @Roles('user', 'admin')
    async changePassword(@Req() req) {
        const passwordDetails = {
          newPassword: req.body.newPassword,
          verifyPassword: req.body.verifyPassword,
          currentPassword: req.body.currentPassword
        };
        return await this.userService.changePassword(req.user, passwordDetails);
    }

    /*
      Route:        GET api/users/get-potential-users-by-job/:jobId
      Roles:        user, admin
      Description:  Get potential users to invite to the employer Job
    */
    @Get('get-potential-users/:jobId')
    @Roles('user', 'admin')
    @UserType('employer')
    async getPotentialUsersByJob(@Req() req) {
        return await this.userService.getPotentialUsersByJob(req.params.jobId);
    }
}
