// src/app/api/summarize/schema.ts
import { z } from "zod";

export const RequestSchema = z.object({
  videoId: z.string().min(11).max(11).regex(/^[a-zA-Z0-9_-]{11}$/)
});