import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch";

export async function checkExistingSummary(videoId: string): Promise<Response | null> {
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
    return new Response(
      JSON.stringify({
        success: true,
        status: 201,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  }
  
  return null;
}