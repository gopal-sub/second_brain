import {z} from 'zod'

export const user_schema = z.object({
        email: z.string().email("Please provide a valid email"),
        password: z.string().min(8, "Minimum length for password is 8")

});

