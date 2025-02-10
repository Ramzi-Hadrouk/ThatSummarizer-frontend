import { z } from "zod";

const UpdateProfileSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Only letters, numbers, and underscores allowed"),
  
  email: z.string()
    .email("Invalid email address")
    .max(100, "Email too long"),

  firstname: z.string()
    .max(50, "First name too long")
    .regex(/^[a-zA-Z\s]+$/, "First name must contain only letters and spaces")
    .transform(val => val.trim() || null)
    .nullable(),

  lastname: z.string()
    .max(50, "Last name too long")
    .regex(/^[a-zA-Z\s]+$/, "Last name must contain only letters and spaces")
    .transform(val => val.trim() || null)
    .nullable(),

  bio: z.string()
    .max(500, "Bio too long")
    .transform(val => val.trim() || null)
    .nullable(),
});

export default UpdateProfileSchema;
