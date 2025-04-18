// src/app/api/summarize/functions/fetchTranscript.ts
import { LogType, print } from "@/utils/functions/print";
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch";
import { createErrorResponse } from "@/utils/functions/create-error-response";
import { TranscriptResult } from "../types";

export async function fetchTranscript(videoId: string): Promise<TranscriptResult> {
  const transcriptUrl  = `https://deserving-harmony-9f5ca04daf.strapiapp.com/utilai/yt-transcript/${videoId}`;
  
  try {
    const transcriptContent:string = await enhancedFetch(
      transcriptUrl,
      { timeout: 20000 },
      ResponseType.TEXT
    );
    
    // Validate transcript content
    if (!transcriptContent?.trim()) {
      return createErrorResponse("Empty transcript received", 404);
    }
    
    return { content: transcriptContent };
    
  } catch (error) {
    if (error instanceof Error) {
      print({
        location: "summary-route/transcript-fetch",
        type: LogType.Error,
        mss: error.message
      });
      
      return createErrorResponse(
        error.message.includes("timeout")
          ? "Transcript service timeout"
          : "Transcript service unavailable",
        error.message.includes("timeout") ? 504 : 503
      );
    }
    
    return createErrorResponse("Unknown transcript error", 500);
  }
}