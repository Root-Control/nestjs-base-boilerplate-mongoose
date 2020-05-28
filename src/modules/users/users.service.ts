import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Model, Connection, model } from 'mongoose';

import { USER_MODEL_TOKEN, MESSAGES, HTTP_SERVER_PORT, DOMAIN, S3_UPLOADS  } from '../../server.constants';
import { IUser } from './interfaces/user.interface';
import { UserSchema } from './schemas/user.schema';

import { getErrorMessage } from '../../common/helpers/error-handler';

import { isEmptyObject } from '../../common/helpers/utils';

import { parseImageURL } from '../../common/helpers/converters';

import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class UserService {
    private userModel;
    private params;
    private notAllowedFields = '-salt -password -resetPasswordToken -verificationToken -resetPasswordExpires';

    constructor(@Inject(REQUEST) private readonly request: Request) {
        const db = request['dbConnection'];
        this.userModel = db.model(USER_MODEL_TOKEN, UserSchema) as Model<IUser>;
    }

    async me(userModel: IUser) {
        return userModel;
    }

    async getUsers(query?): Promise<IUser[]> {
        return await this.userModel.find(query).select(this.notAllowedFields);
    }

    async updateProfileImage(user, file): Promise<IUser> {
        const PORT = HTTP_SERVER_PORT !== 80 ? `:${HTTP_SERVER_PORT}`: '';

        let location = S3_UPLOADS ? file.location:  `${DOMAIN}${PORT}/${parseImageURL(file.path)}`.replace('public', '');
        user.profileImageURL = location;
        return await user.save();
    }

    async getUserById(userId): Promise<IUser> {
        return await this.userModel.findById(userId).select(this.notAllowedFields);
    }

    async deleteUser(user) {
        return await user.remove();
    }

    async updateUser(user, body) {
        let properties = {
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            bio: body.bio,
            displayName: `${body.firstName} ${body.lastName}`
        }
        //  user.email = body.email;
        user.patch(properties);
        return user;
    }

    async changePassword(user, passwordDetails) {
        user = await this.userModel.findOne({ email: user.email });
        try {
            if (passwordDetails.newPassword !== passwordDetails.verifyPassword) {
                throw new HttpException(MESSAGES.PASSWORD_NOT_MATCH, HttpStatus.UNPROCESSABLE_ENTITY);
            }

            if (!user.authenticate(passwordDetails.currentPassword)) {
                throw new HttpException(MESSAGES.UNAUTHORIZED_INVALID_PASSWORD, HttpStatus.UNPROCESSABLE_ENTITY);
            }
            
            user.password = passwordDetails.newPassword;
            await user.save();

            return {
                success: true
            };
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        }
    }

    async getPotentialUsersByJob(jobId) {
        try {
            return await this.userModel.getPotentialUsersByJob(jobId);
        } catch (ex) {
            throw new HttpException(getErrorMessage(ex), HttpStatus.UNPROCESSABLE_ENTITY);
        } 
    }
}
