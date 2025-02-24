import isAuthenticated from "@/auth-logic/is-authenticated";
import { getCurrentDate } from "./get-current-date";
 
 interface summaryData{
    video_id: string;
    title: string;
    summary: string;
    author_id: string;
    date?: string ;
  }
 
 export  async function sendSummaryToBackend(summaryData:summaryData ) {
    summaryData.date=getCurrentDate();
    const BackendApiEndPoint = `${process.env.BASE_URL || "http://localhost:1337"}/api/summaries`;
  
    const user = await isAuthenticated(undefined);
    if (!user?.isValid || !user?.token) {
      throw new Error("User Not Authenticated - No Token Found");
    }
  
    console.log("Token:", user.token);
  
    const requestBody = {
      data: summaryData,
    };
  
    try {
      const response = await fetch(BackendApiEndPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(requestBody),
      });
  
      const responseData =  response;
      
  
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
  