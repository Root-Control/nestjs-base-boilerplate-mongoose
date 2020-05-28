import { Document } from 'mongoose';

/**
 *  Declaring the Interface BlogPost
 */
export interface IBlogPost extends Document {
	_id: string;
    created: Date;
    title: string;
    content: string;
}
