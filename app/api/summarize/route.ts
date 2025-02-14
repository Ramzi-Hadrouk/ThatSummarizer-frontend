import { NextRequest } from "next/server";
import { LogType, print } from "@/utils/functions/print";

export async function POST(req: NextRequest) {
  try {
    const requestData = await req.json();
    print({
      location: 'summary-route',
      type: LogType.Success,
      mss: 'Received data:',
      data: requestData
    });

    // Validate videoId exists
    const videoId = requestData.videoId;
    if (!videoId) {
      return new Response(
        JSON.stringify({ error: "Missing videoId in request body" }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    const url = `https://deserving-harmony-9f5ca04daf.strapiapp.com/utilai/yt-transcript/${videoId}`;

    // Fetch transcript with error handling
    const transcriptResponse = await fetch(url);

    if (!transcriptResponse.ok) {
      throw new Error(`Failed to fetch transcript: ${transcriptResponse.statusText}`);
    }

    const transcriptData = await transcriptResponse.text();

    return new Response(
      JSON.stringify({ transcript: transcriptData, error: null }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    print({
      location: 'summary-route',
      type: LogType.Error,
      mss: `Error:`,
      data:errorMessage
    });

    // Proper error response with status code
    return new Response(
      JSON.stringify({
        error: errorMessage,
        stack: error instanceof Error ? error.stack : undefined
      }),
      {
        status: error instanceof Error && 'status' in error ?
          (error as any).status : 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}