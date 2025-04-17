// /api/summarize route improvements
import { NextRequest } from "next/server";
import { LogType, print } from "@/utils/functions/print";
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch";
import { geminiGenerateSummary } from "@/utils/functions/gemini-generate-summary";
import { createErrorResponse } from "@/utils/functions/create-error-response";
import { sendSummaryToBackend } from "@/utils/functions/send-summary-to-backend";
import { extractTitleLine } from "@/utils/functions/extractTitleLine";
import { z } from "zod";
import { extractDescription } from "@/utils/functions/extractDescription";

const RequestSchema = z.object({
  videoId: z.string().min(11).max(11).regex(/^[a-zA-Z0-9_-]{11}$/)
});

interface summaryData{
  video_id: string;
  title: string;
  summary: string;
  description: string;
  date?: string ;
}

export async function POST(req: NextRequest): Promise<Response> {
  try {
    // Validate request body
    const rawBody = await req.text();
    console.log('rawVody ' + rawBody)
    if (!rawBody) return createErrorResponse("Empty request body", 400);

    let requestData;
    try {
      requestData = JSON.parse(rawBody);
    } catch {
      return createErrorResponse("Invalid JSON format", 400);
    }

    const validation = RequestSchema.safeParse(requestData);
    if (!validation.success) {
      return createErrorResponse(
        `Invalid videoId: ${validation.error.errors[0]?.message || "Invalid format"}`,
        400
      );
    }

    const { videoId } = validation.data;

    // check if summary exist ---------------
    const summary: { data: [any] } = await enhancedFetch(
      `${process.env.BASE_URL || "http://localhost:1337"}/api/summaries?filters[video_id][$eq]=${videoId}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        timeout: 20000
      },
      ResponseType.JSON
    );

    if (summary?.data.length === 1) {
      // Success response with full status information
      return new Response(
        JSON.stringify({
          success: true,
          status: 201,
        }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );

    }
    //--------------------------------------
    // Fetch transcript with improved error handling
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

    // Validate transcript content
    if (!transcriptResponseData?.trim()) {
      return createErrorResponse("Empty transcript received", 404);
    }

    // Generate summary with content validation
    let summaryResponse ;
    try {
      summaryResponse =  await geminiGenerateSummary(transcriptResponseData) ;
      if (!summaryResponse?.trim()) {
        return createErrorResponse("Empty summary generated", 500);
      }
    } catch (error) {
      print({
        location: "summary-route/summary-generation",
        type: LogType.Error,
        mss: "Gemini generation failed",
        data: error instanceof Error ? error.message : "Unknown error"
      });
      return createErrorResponse("Summary generation failed", 500);
    }
    
    print({
      location: "summary-route/summary-generation",
      type: LogType.Success,
      mss: "  Summary generrated  ",
      data:  JSON.parse(summaryResponse).title
    });
    // Construct summary payload
    const title = JSON.parse(summaryResponse).title;
    const description = JSON.parse(summaryResponse).description ;
    const summaryObject :summaryData= {
      video_id: videoId,
      title: title?.trim() || "Untitled Video",
      summary: JSON.parse(summaryResponse).summary,
      description:description|| "No description "
    };

    // Validate final payload
    if (!summaryObject.summary || summaryObject.summary.length < 100) {
      return createErrorResponse("Insufficient summary content", 500);
    }

    // Backend submission with improved error handling
    try {
      const backendResponse = await sendSummaryToBackend(summaryObject);
      if (!backendResponse.ok) {
        const errorData = await backendResponse.json().catch(() => ({}));
        return createErrorResponse(
          errorData.message || "Backend submission failed",
          backendResponse.status
        );
      }
    } catch (error) {
      return createErrorResponse("Backend service unavailable", 503);
    }

    // Success response with full status information
    return new Response(
      JSON.stringify({
        success: true,
        status: 200,
        data: summaryResponse
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
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