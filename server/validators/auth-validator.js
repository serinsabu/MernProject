const { z } = require("zod");

// create an object schema
// login

// create an object schema
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid Email Address" })
    .min(3, { message: "Email must be atleast 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 characters" })
    .max(1024, { message: "Password can't be greater than 1024 characters" }),
});

// signup
const signupSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be atleast 3 characters" })
    .max(255, { message: "Username must not be more than 255 characters" }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Email must be atleast 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Mobile number is required" })
    .trim()
    .min(10, { message: "Mobile number must be atleast 10 characters" })
    .max(20, { message: "Mobile number must not be more than 20 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .trim()
    .min(8, { message: "Password must be atleast 8 characters" })
    .max(1024, { message: "Password can't be greater than 1024 characters" }),
});

module.exports = { loginSchema, signupSchema };
