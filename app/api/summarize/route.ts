import { NextRequest } from "next/server";
import { LogType, print } from "@/utils/functions/print";
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch";
import { geminiGenerateSummary } from "@/utils/functions/gemini-generate-summary";
import { createErrorResponse } from "@/utils/functions/create-error-response";
import { sendSummaryToBackend } from "@/utils/functions/send-summary-to-backend";
import { extractTitleLine } from "@/utils/functions/extractTitleLine";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    // Parse and validate request
    const requestData = await req.json();
    const videoId = requestData.videoId;

    if (!videoId) {
      return createErrorResponse("Missing videoId in request body", 400);
    }

    // Fetch transcript
    const transcriptUrl = `https://deserving-harmony-9f5ca04daf.strapiapp.com/utilai/yt-transcript/${videoId}`;
    let transcriptResponseData: string;

    try {
      transcriptResponseData = await enhancedFetch(
        transcriptUrl,
        { timeout: 20000 },
        ResponseType.TEXT
      );
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes("timeout")) {
          return createErrorResponse("Transcript service timeout", 504);
        }
        if (error.message.includes("fetch failed")) {
          return createErrorResponse("Transcript service unavailable", 503);
        }
      }
      throw error;
    }

    // Validate transcript response
    try {
      const parsedResponse = JSON.parse(transcriptResponseData);
      if (parsedResponse.error) {
        if (parsedResponse.error.includes("Transcript panel not found")) {
          return createErrorResponse("Transcript not available for this video", 404);
        }
        return createErrorResponse(`Transcript error: ${parsedResponse.error}`, 400);
      }
    } catch (error) {
      if (!(error instanceof SyntaxError)) {
        return createErrorResponse("Invalid transcript response format", 502);
      }
    }

    // Generate summary
    let summaryResponse: string;
    try {
      summaryResponse = await geminiGenerateSummary(transcriptResponseData);
      if (!summaryResponse?.trim()) {
        return createErrorResponse("Empty summary generated", 500);
      }
    } catch (error) {
      return createErrorResponse("Summary generation failed", 500);
    }

    // Prepare and validate summary object
    const summaryObject = {
      video_id: videoId,
      title: extractTitleLine(summaryResponse) || "Untitled Video",
      summary: summaryResponse,
      author_id: "test"
    };

    if (!summaryObject.title || !summaryObject.summary) {
      return createErrorResponse("Invalid summary format", 500);
    }

    // Send to backend
    try {
      const backendResponse = await sendSummaryToBackend(summaryObject);
      if (!backendResponse.ok) {
        const status = backendResponse.status >= 400 ? backendResponse.status : 502;
        const message = `Backend service error: ${backendResponse.statusText}`;
        return createErrorResponse(message, status);
      }
    } catch (error) {
      return createErrorResponse("Backend service unavailable", 503);
    }

    // Success response
    return new Response(
      JSON.stringify({
        success: true,
        data: summaryResponse
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    // Handle unexpected errors
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    print({
      location: "summary-route",
      type: LogType.Error,
      mss: "Unexpected error:",
      data: errorMessage
    });
    return createErrorResponse("Internal server error", 500);
  }
}