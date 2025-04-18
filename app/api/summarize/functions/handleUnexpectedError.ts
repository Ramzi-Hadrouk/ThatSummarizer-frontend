// src/app/api/summarize/functions/handleUnexpectedError.ts
import { LogType, print } from "@/utils/functions/print";
import { createErrorResponse } from "@/utils/functions/create-error-response";

export function handleUnexpectedError(error: unknown): Response {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  
  print({
    location: "summary-route",
    type: LogType.Error,
    mss: "Unexpected error:",
    data: errorMessage
  });
  
  return createErrorResponse("Internal server error", 500);
}