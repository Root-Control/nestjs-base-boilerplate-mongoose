import { object, string, boolean, ObjectSchema } from 'joi';

export const authUserSchema: ObjectSchema = object({
    firstName: string().required(),
    lastName: string().required(),
    email: string().email().required(),
    userType: string().required().label('user type error, please let us know if you are an employer or employee'),
    password: string().alphanum().min(6).max(36).required()
});
