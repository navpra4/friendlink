import {z} from "zod"

const requiredString = z.string().trim().min(1, "Required")

export const signupSchema = z.object({
    email: requiredString.email("Invalid email address"),
    username: requiredString.regex(
        /^[a-zA-Z0-9_]+$/,
        "Only alphanumerics and underscore are allowed."
    ),
    password: requiredString.min(8, "Must be at least 8 characters.")
})

export type SignUpValues = z.infer<typeof signupSchema>

export const loginSchema = z.object({
    username: requiredString,
    password: requiredString,
})

export type Loginvalues = z.infer<typeof loginSchema>
