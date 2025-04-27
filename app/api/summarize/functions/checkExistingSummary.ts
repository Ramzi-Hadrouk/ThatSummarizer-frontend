import isAuthenticated from '@/auth-logic/is-authenticated';

interface ApiResponse {
  isValid: boolean;
  data: any;
  error: string | null;
  token?: string;
}


export async function checkExistingSummary(videoId: string): Promise<Response | null> {

  const authData :ApiResponse = await isAuthenticated(undefined);
  if (!authData?.isValid || !authData?.token) {
    throw new Error("User is not authenticated or token is missing.");
  }
  const response = await fetch( `${process.env.BASE_URL || "http://localhost:1337"}/api/summaries?filters[video_id][$eq]=${videoId}`,
     {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authData.token}`,
    },
  });

  const summary: { data: [any] } =await response.json();
  

 

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