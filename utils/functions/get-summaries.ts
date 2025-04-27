interface ApiResponse {
    isValid: boolean;
    data: any;
    error: string | null;
    token?: string;
  }

 
 export  async function getSummaries(currentPage:number ) {
  
    const BackendApiEndPoint = `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:1337"}/api/summaries/?pagination[page]=${currentPage}&pagination[pageSize]=6&sort[0]=createdAt:desc`;
    
    const authRes = await fetch("/api/auth/check");
  
    if (!authRes.ok) {
      throw new Error(`Auth check failed with status ${authRes.status}`);
    }
  
    const authData: ApiResponse = await authRes.json();
  
    if (!authData?.isValid || !authData?.token) {
      throw new Error("User is not authenticated or token is missing.");
    }
  
    try {
      const response = await fetch(BackendApiEndPoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authData.token}`,
        },
      });
  
      const responseData =  response.json();
      
  
      return responseData;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error sending summary:", error.message);
            throw error; 
          } else {
            console.error("Unexpected error:", error);
            throw new Error("An unexpected error occurred while sending the summary.");
          }
    }
  }
  