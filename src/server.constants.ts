import { 
	Config,
	MailingConfig,
	AwsConfig,
	DbConfig,
	IEnvironmentConfig,
	IMailingConfig,
	IAwsConfig,
	IDbConfig 
} from './config/config';

console.log('Configurating the server');

//  SERVER_CONFIG Assignation
export const SERVER_CONFIG: IEnvironmentConfig = Config;

//  DATABASE_CONFIG Assignation
export const SERVER_DATABASE_CONFIG: IDbConfig = DbConfig;

//  AWS_CONFIG Assignation
export const AWS_CONFIG: IAwsConfig = AwsConfig;

//  MAILING_CONFIG Assignation
export const MAILING_CONFIG: IMailingConfig = MailingConfig;

//  Environment variables
export const env = Config.environment || 'development';

//  Token for DB_Connection
export const DB_CONNECTION_TOKEN: string = SERVER_DATABASE_CONFIG.dbConnectionToken;

//  Token for Server
export const SERVER_CONFIG_TOKEN: string = SERVER_CONFIG.serverConfigToken;

//  Token for twitter_Config
export const FACEBOOK_CONFIG_TOKEN: string = 'FacebookConfigToken';

//  Token for twitter_Config
export const TWITTER_CONFIG_TOKEN: string = 'TwitterConfigToken';

//  Token for Google_config
export const GOOGLE_CONFIG_TOKEN: string = 'GoogleConfigToken';

//  Mailing
export const MAILING_EMAIL: string = MAILING_CONFIG.email;

export const MAILING_PASSWORD: string = MAILING_CONFIG.password;

export const DEFAULT_DATABASE: string = SERVER_DATABASE_CONFIG.defaultDatabase;

export const IS_ATLAS_CLOUD: boolean = SERVER_DATABASE_CONFIG.isAtlasCloud;

export const S3_UPLOADS: boolean = AWS_CONFIG.s3Uploads;

/*
 *  AWS CONFIGURATION  
 */

export const AWS_KEY: string = AWS_CONFIG.awsKey;

export const AWS_SECRET: string = AWS_CONFIG.awsSecret;

export const AWS_BUCKET: string = AWS_CONFIG.awsBucket;

export const AWS_ACL: string = AWS_CONFIG.awsAcl;

export const DATABASES: string[] = SERVER_DATABASE_CONFIG.databases;


export const MONGODB_SEED: boolean = SERVER_DATABASE_CONFIG.databaseSeeding;

export const DOMAIN: string = Config.domain;

export const HTTP_SERVER_PORT: number = Config.httpPort;

/**
 *  Token for Models
 */
export const USER_MODEL_TOKEN: string = 'User';
export const ARTICLE_MODEL_TOKEN: string = 'Article';
export const BLOGPOST_MODEL_TOKEN: string = 'BlogPost';

//  Message definitions
export const MESSAGES = {
	FORBIDDEN_OPERATION: 'Error, You cannot delete it',
	EMAIL_REQUIRED: 'Email is required',
	INVALID_VERIFICATION_TOKEN: 'Invalid verification token',
	PASSWORD_RESET_TOKEN_INVALID_OR_EXPIRED: 'Password reset token is invalid or has expired.',
	PASSWORD_NOT_MATCH: 'Passwords do not match',
	EMAIL_SENT: 'Message sent, verify your email address',
	INVALID_RESET_TOKEN: 'Invalid Reset Token',
    UNAUTHORIZED_EMAIL_OR_USERNAME_IN_USE: 'Email or username already exists',
    UNAUTHORIZED_INVALID_PASSWORD: 'Invalid password',
    UNAUTHORIZED_INVALID_EMAIL: 'The email does not exist',
    UNAUTHORIZED_UNRECOGNIZED_BEARER: 'Unrecognized bearer of the token'
};
