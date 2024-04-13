const { z } = require("zod");

//creating an object schema
const signupSchema = z.object({
    username: z
        .string({ required_error: "Username is required!" })
        .trim()
        .min(3, { message: "Username must be at least of 3 characters!" })
        .max(255, { message: "Username must not be more than 255 characters"}),

        email: z
        .string({ required_error: "Email is required!" })
        .trim()
        .email({ message: "Invalid email address!" })
        .min(3, { message: "Email address must be at least of 3 characters!" })
        .max(255, { message: "Email address must not be more than 255 characters"}),

        phone: z
        .string({ required_error: "Phone number is required!" })
        .trim()
        .min(10, { message: "Phone number must be at least of 10 characters!" })
        .max(20, { message: "Phone number must not be more than 20 characters"}),

        password: z
        .string({ required_error: "Password is required!" })
        .trim()
        .min(7, { message: "Password must be at least of 7 characters!" })
        .max(1023, { message: "Password must not be more than 1023 characters"}),
});

const loginSchema = z.object({
    email: z
    .string({ required_error: "Email is required!" })
    .trim()
    .email({ message: "Invalid email address!" })
    .min(3, { message: "Email address must be at least of 3 characters!" })
    .max(255, { message: "Email address must not be more than 255 characters"}),

    password: z
    .string({ required_error: "Password is required!" })
    .trim()
    .min(7, { message: "Password must be at least of 7 characters!" })
    .max(1023, { message: "Password must not be more than 1023 characters"}),
});

module.exports = {signupSchema, loginSchema};