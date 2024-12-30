import { z } from "zod";

const loginSchema = z.object({

   
  email: z
    .string()
    .email("Invalid email address."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter.")
    .regex(/[a-z]/, "Password must include at least one lowercase letter.")
    .regex(/\d/, "Password must include at least one number.")
    .regex(/[@$!%*?&]/, "Password must include at least one special character."),
});
export default loginSchema;
