import { object, string, boolean, ObjectSchema } from 'joi';

/**
 *  BlogPost Schema Declaration (Before REST communication)
 */

export const blogpostSchema: ObjectSchema = object({
    title: string().required(),
    content: string().required()
});
