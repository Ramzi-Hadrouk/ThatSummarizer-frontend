// src/app/api/summarize/route.ts
import { NextRequest } from "next/server";
import { parseAndValidateRequest } from "./functions/parseAndValidateRequest";
import { checkExistingSummary } from "./functions/checkExistingSummary";
import { fetchTranscript } from "./functions/fetchTranscript";
import { generateSummary } from "./functions/generateSummary";
import { createSummaryObject } from "./functions/createSummaryObject";
import { saveSummaryToBackend } from "./functions/saveSummaryToBackend";
import { createSuccessResponse } from "./functions/createSuccessResponse";
import { handleUnexpectedError } from "./functions/handleUnexpectedError";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const requestData = await parseAndValidateRequest(req);
   
    if (!('videoId' in requestData)) {
      return requestData as Response; // This is an error response
    }

    const  videoId :string = requestData.videoId;
    // Check if summary already exists
    const existingSummary = await checkExistingSummary(videoId);


    if (existingSummary) {
      return existingSummary;
    }
    
    // Fetch and validate transcript
    const transcript = await fetchTranscript(videoId);
    if (!('content' in transcript)) {
      return transcript as Response; // This is an error response
    }
    
    // Generate summary
    const summaryResult = await generateSummary(transcript.content);
    if (!('data' in summaryResult)) {
      return summaryResult as Response; // This is an error response
    }
    
    // Create and save summary
    const summaryData = createSummaryObject(videoId, summaryResult.data);
    const saveResult = await saveSummaryToBackend(summaryData);
    if (!('success' in saveResult)) {
      return saveResult as Response; // This is an error response
    }
    
    // Return success response
    return createSuccessResponse(summaryResult.data);
    
  } catch (error) {
    return handleUnexpectedError(error);
  }
}