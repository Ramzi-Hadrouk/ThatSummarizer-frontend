import { NextRequest } from "next/server";
import { createErrorResponse } from "@/utils/functions/create-error-response";
import { RequestSchema } from "../schema";
import { RequestData } from "../types";

export async function parseAndValidateRequest(req: NextRequest): Promise<RequestData | Response> {
  const rawBody = await req.text();
  console.log('rawBody ' + rawBody);
  
  if (!rawBody) {
    return createErrorResponse("Empty request body", 400);
  }

  let requestData;
  try {
    requestData = JSON.parse(rawBody);
    console.log(requestData)
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

  return validation.data;
}