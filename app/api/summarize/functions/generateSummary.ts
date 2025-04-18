// src/app/api/summarize/functions/generateSummary.ts
import { LogType, print } from "@/utils/functions/print";
import { geminiGenerateSummary } from "@/utils/functions/gemini-generate-summary";
import { createErrorResponse } from "@/utils/functions/create-error-response";
import { SummaryResult } from "../types";

export async function generateSummary(transcript: string): Promise<SummaryResult> {
  try {
    const summaryResponse = await geminiGenerateSummary(transcript);
    
    if (!summaryResponse?.trim()) {
      return createErrorResponse("Empty summary generated", 500);
    }
    
    print({
      location: "summary-route/summary-generation",
      type: LogType.Success,
      mss: "Summary generated",
      data: JSON.parse(summaryResponse).title
    });
    
    return { data: summaryResponse };
    
  } catch (error) {
    print({
      location: "summary-route/summary-generation",
      type: LogType.Error,
      mss: "Gemini generation failed",
      data: error instanceof Error ? error.message : "Unknown error"
    });
    
    return createErrorResponse("Summary generation failed", 500);
  }
}