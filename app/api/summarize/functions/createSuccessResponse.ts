// src/app/api/summarize/functions/createSuccessResponse.ts

export function createSuccessResponse(summaryResponse: string): Response {
    return new Response(
      JSON.stringify({
        success: true,
        status: 200,
        data: summaryResponse
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  }