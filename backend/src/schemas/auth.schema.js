import {z} from 'zod';

export const userLogin = z.object({

    username: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
    }).email(),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string'
    }).min(6).max(100)
});

