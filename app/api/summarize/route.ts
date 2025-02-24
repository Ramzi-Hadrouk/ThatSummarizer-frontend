import { NextRequest } from "next/server";
import { LogType, print } from "@/utils/functions/print";
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch";
import { geminiGenerateSummary } from "@/utils/functions/gemini-generate-summary";
import { createErrorResponse } from "@/utils/functions/create-error-response";
import isAuthenticated from "@/auth-logic/is-authenticated";
import { getCurrentDate } from "@/utils/functions/get-current-date";
import { sendSummaryToBackend } from "@/utils/functions/send-summary-to-backend";
/**
 * Handles the POST request to fetch a YouTube transcript.
 *
 * Expects the request JSON to contain a property `videoId`.
 * Uses the enhancedFetch function to perform the request with a timeout.
 *
 * @param {NextRequest} req - The incoming request.
 * @returns {Promise<Response>} A promise that resolves with the HTTP response.
 */
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


    let summary = await geminiGenerateSummary(transcriptResponseData);
    print({
      location: " summarize route ", type: LogType.Success, mss: "Summary generated successfully", data: summary,
    });
    
    //----send to the backend-------------------
    /*const BackendApiEndPoint = `${process.env.BASE_URL || "http://localhost:1337"}/api/summaries`;

    const user = await isAuthenticated(undefined);
    if (!user?.isValid || !user?.token) {
      throw new Error("User Not Authenticated - No Token Found");
    }
    
    print({
      location: "summarize route",
      type: LogType.Success,
      mss: "VALID USER",
      data: user,
    });
    
    const date: string = getCurrentDate();
    
    let summaryObject = {
      "data": {
      video_id: "test from frontend",
      title: "test",
      summary: "test",
      author_id: "test",
      date: date,
    }};
    
    var response = await enhancedFetch(BackendApiEndPoint, {
      timeout: 20000,
      method: "POST",
      body: JSON.stringify(summaryObject),
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`,
      },
    });

  */
    let summaryObject = {
      video_id: "test  THREE from frontend using function ",
      title: "test",
      summary:summary ,
      author_id: "test"
      
    };
    
    let sendSummaryToBackendResponse = await sendSummaryToBackend(summaryObject);
    return new Response(

      JSON.stringify(summary),
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
