import { NextRequest } from "next/server";
import { LogType, print } from "@/utils/functions/print";
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch";
import { geminiGenerateSummary } from "@/utils/functions/gemini-generate-summary";
import { createErrorResponse } from "@/utils/functions/create-error-response";
import { sendSummaryToBackend } from "@/utils/functions/send-summary-to-backend";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    var requestData = await req.json();

    // Validate that videoId exists
    var videoId = requestData.videoId;
    if (!videoId) {
      return createErrorResponse("Missing videoId in request body", 400);
    }
    print({
      location: "summary-route", type: LogType.Success, mss: "Received data:", data: requestData
    });


    var transcriptUrl = "https://deserving-harmony-9f5ca04daf.strapiapp.com/utilai/yt-transcript/" + videoId;


    var transcriptResponseData: string = await enhancedFetch(transcriptUrl, { timeout: 20000 }, ResponseType.TEXT);
    print({
      location: "summary-route", type: LogType.Information, mss: "script fitched :", data: transcriptResponseData
    });


    let summaryResponse = await geminiGenerateSummary(transcriptResponseData);
    print({
      location: " summarize route ", type: LogType.Success, mss: "Summary generated successfully", data: summaryResponse,
    });
    
    
    let summaryObject = {
      video_id: "test  THREE from frontend using function ",
      title: "test",
      summary:summaryResponse ,
      author_id: "test"
      
    };
    
    let sendSummaryToBackendResponse = await sendSummaryToBackend(summaryObject);
    return new Response(

      JSON.stringify(summaryResponse),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    var errorMessage = error instanceof Error ? error.message : "Unknown error";
    var errorStack = error instanceof Error ? error.stack : undefined;

    print({
      location: "summary-route",
      type: LogType.Error,
      mss: "Error:",
      data: errorMessage
    });

    var statusCode = (error instanceof Error && "status" in error) ? (error as any).status : 500;
    return createErrorResponse(errorMessage, statusCode, errorStack);
  }
}
