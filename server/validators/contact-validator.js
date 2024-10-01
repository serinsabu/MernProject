const { z } = require("zod");

// contact schema
const contactSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must contain atleast 3 characters" })
    .max(255, {
      message: "Username must not contain more than 255 characters",
    }),
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .min(3, { message: "Email must contain atleast 3 characters" })
    .max(255, { message: "Email must not contain more than 255 characters" }),
  message: z
    .string({ required_error: "Message is required" })
    .trim()
    .min(3, { message: "Message must contain atleast 3 characters" })
    .max(255, { message: "Message must not contain more than 255 characters" }),
});

module.exports = contactSchema;
