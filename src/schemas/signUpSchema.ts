import {z} from 'zod'
// Single Username Validation Schema
export const usernameValidation = z.string().min(2,"Username at least 2 characters long").max(20,"Username at most 20 characters long").regex(/^[a-zA-Z0-9_]+$/,"Username must not contain special characters")

export const signUpSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message:"Invalid email address"}),
    password: z.string().min(6, { message: "Password at least 8 characters long" }).regex(/^[a-zA-Z0-9_]+$/,"Password must not contain special characters"),
})

export default signUpSchema;