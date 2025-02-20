import { NextRequest } from "next/server";
import { LogType, print } from "@/utils/functions/print";
import {enhancedFetch , ResponseType} from "@/utils/functions/enhanced-fetch";

/**
 * Creates a standardized error response.
 *
 * @param {string} message - The error message.
 * @param {number} status - The HTTP status code.
 * @param {string} [stack] - An optional error stack.
 * @returns {Response} The formatted error response.
 */
function createErrorResponse(message: string, status: number, stack?: string): Response {
  return new Response(
    JSON.stringify({
      error: {
        message: message,
        stack: stack ? stack : null
      }
    }),
    {
      status: status,
      headers: { "Content-Type": "application/json" }
    }
  );
}

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
      location: "summary-route",
      type: LogType.Success,
      mss: "Received data:",
      data: requestData
    });


    var transcriptUrl = "https://deserving-harmony-9f5ca04daf.strapiapp.com/utilai/yt-transcript/" + videoId;
    
    /*
      Here we assume that the transcript endpoint returns a JSON response
      with a property 'transcript', for example:
      {
        "transcript": "The transcript text..."
      }
    */
    var transcriptResponseData = await enhancedFetch(transcriptUrl,{ timeout: 8000 } ,ResponseType.TEXT);
    print({
      location: "summary-route",
      type: LogType.Information,
      mss: "script fitched :",
      data: transcriptResponseData
    });

    return new Response(

      JSON.stringify( transcriptResponseData),
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
