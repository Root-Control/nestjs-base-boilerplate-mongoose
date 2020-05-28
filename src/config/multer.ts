import { HttpException, HttpStatus } from '@nestjs/common';

import { diskStorage } from 'multer';
import { extname } from 'path';
import { AWS_KEY, AWS_SECRET, AWS_ACL, AWS_BUCKET, S3_UPLOADS } from '../server.constants';

import * as multerS3 from 'multer-s3';
import { S3, config } from 'aws-sdk';

/**
 *  creating storage variable, this variable will get the configuration (local or production)
 */

let storage;
if (S3_UPLOADS) {
    config.update({
        accessKeyId: AWS_KEY,
        secretAccessKey: AWS_SECRET
    });

    const s3 = new S3();

    storage = multerS3({
        s3,
        bucket: AWS_BUCKET,
        acl: AWS_ACL,
        metadata: (req, file, cb) => {
            cb(null, {fieldName: file.fieldname});
        },
        key: (req, file, cb) => {
            const keyName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            //cb(null, `${keyName}${extname(file.originalname)}`)
            cb(null, `${new Date().getTime()}${file.originalname}`)
        }
    });
} else {
    storage = diskStorage({
        destination: './public/uploads',
        filename: (req, file, cb) => {
            //  Generating a 32 random chars long string
            //const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
            //cb(null, `${randomName}${extname(file.originalname)}`);

            //  Calling the callback passing the random name generated with the original extension name            
            cb(null, `${new Date().getTime()}${file.originalname}`)
        }
    });
}

/**
 *  Creating variable for exportation
 */
const MulterConfig = {
    storage
};

export {
    MulterConfig
};
