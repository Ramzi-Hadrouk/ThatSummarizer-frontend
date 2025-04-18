// src/app/api/summarize/functions/validateSummaryContent.ts
import { createErrorResponse } from "@/utils/functions/create-error-response";
import { SummaryData } from "../types";

export function validateSummaryContent(summaryObject: SummaryData): Response | null {
  if (!summaryObject.summary || summaryObject.summary.length < 10) {
    return createErrorResponse("Insufficient summary content", 500);
  }
  
  return null;
}