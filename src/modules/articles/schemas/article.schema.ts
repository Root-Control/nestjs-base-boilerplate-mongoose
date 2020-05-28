import { Schema } from 'mongoose';

/**
 *  Article Schema Declaration for Mongodb, declarated by mongoose schema
 */

export const ArticleSchema: Schema = new Schema({
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

ArticleSchema.pre('save', function(next, params) {
    if (this.isNew) {
        this['wasNew'] = this.isNew;
    }
    next();
});

ArticleSchema.post('save', async function(article) {
    if (this.wasNew) {
        console.log('Is Created');
    } else {
        console.log('Is Updated');
    }
});

ArticleSchema.methods.patch = async function(object) {
    const article = Object.assign(this, object);
    return await article.save();
};
