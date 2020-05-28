import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/user.interface';
import { generateHashedPassword, generateSalt, generateRandomToken } from '../../../utilities/encryption';

const illegalUsernames: string[] = ['meanjs', 'administrator', 'password', 'admin', 'user', 'unknown', 'anonymous', 'null', 'undefined', 'api'];

console.log('Loading user Schema');

export const UserSchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    firstName: {
        type: String,
        required: 'First name is required'
    },
    lastName: {
        type: String,
        required: 'Last name is required'
    },
    displayName: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        default: null
    },
    email: {
        type: String,
        index: {
            unique: true,
            sparse: true // For this to work on a previously indexed field, the index must be dropped & the application restarted.
        },
        lowercase: true,
        trim: true,
    },
    active: {
        type: Boolean,
        default: true
    },
    password: {
        type: String,
        default: ''
    },
    profileImageURL: {
        type: String,
        default: 'https://duopoly-bucket.s3.ca-central-1.amazonaws.com/interrogation.png'
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerData: {},
    additionalProvidersData: {},
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    updated: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    /* For reset password */
    resetPasswordToken: {
        type: String,
        default: null
    },
    verificationToken: {
        type: String,
        default: generateRandomToken()
    },
    resetPasswordExpires: {
        type: Date,
        default: null
    }
});

UserSchema.pre<IUser>('save', function(next) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }

    if (this.password && this.isModified('password')) {
        this.salt = generateSalt();
        this.password = generateHashedPassword(this.salt, this.password);
    }
    next();
});

UserSchema.post('save', async function(user) {

});

/*UserSchema.methods.authenticate = function (password) {
    console.log('hodas');
};
*/
UserSchema.methods.authenticate = function (password) {
    return this.password === generateHashedPassword(this.salt, password);
};


//  Patch function created
UserSchema.methods.patch = async function(body) {
    const user = Object.assign(this, body);
    return await user.save();
};

function isAdmin(user) {
    if (user.role === 'admin') return true;
    else return false;
}

function validateUsername(username) {
    const usernameRegex = /^(?=[\w.-]+$)(?!.*[._-]{2})(?!\.)(?!.*\.$).{3,34}$/;
    return (
        this.provider !== 'local' ||
        (username && usernameRegex.test(username) && illegalUsernames.indexOf(username) < 0)
    );
}

