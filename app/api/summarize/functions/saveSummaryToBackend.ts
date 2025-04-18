// src/app/api/summarize/functions/saveSummaryToBackend.ts
import { createErrorResponse } from "@/utils/functions/create-error-response";
import { sendSummaryToBackend } from "@/utils/functions/send-summary-to-backend";
import { SummaryData, SaveResult } from "../types";
import { validateSummaryContent } from "./validateSummaryContent";

export async function saveSummaryToBackend(summaryObject: SummaryData): Promise<SaveResult> {
  // Validate content first
  const validationError = validateSummaryContent(summaryObject);
  if (validationError) {
    return validationError;
  }
  
  try {
    const backendResponse = await sendSummaryToBackend(summaryObject);
    
    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      return createErrorResponse(
        errorData.message || "Backend submission failed",
        backendResponse.status
      );
    }
    
    return { success: true };
    
  } catch (error) {
    return createErrorResponse("Backend service unavailable", 503);
  }
}