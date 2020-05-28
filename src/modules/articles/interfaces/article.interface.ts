import { Document } from 'mongoose';

/**
 *  Declaring the Interface Article
 */
export interface IArticle extends Document {
	_id: string;
    created: Date;
    title: string;
    content: string;
}
