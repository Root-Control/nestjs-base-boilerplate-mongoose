import { Schema } from 'mongoose';

/**
 *  BlogPost Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const BlogPostSchema: Schema = new Schema({
    created: {
        type: Date,
        default: new Date()
    },
    title: {
        type: String,
        required: 'Title cannot be blank'
    },
    content: {
        type: String,
        required: 'Content cannot be blank'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

BlogPostSchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

BlogPostSchema.post('save', async function(blogpost) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

BlogPostSchema.methods.patch = async function(object) {
    const blogpost = Object.assign(this, object);
    return await blogpost.save();
};
