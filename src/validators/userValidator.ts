import {z} from 'zod'

export const user_schema_createUser = z.object({
        email: z.string().email("Please provide a valid email"),
        password: z.string().min(8, "Minimum length for password is 8"),
        username: z.string().min(1, "Minimum length for password is 1"),
});

export const user_schema_loginUser = z.object({
        email: z.string().email("Please provide a valid email"),
        password: z.string().min(8, "Minimum length for password is 8")
});
