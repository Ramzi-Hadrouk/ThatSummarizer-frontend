export interface SummaryData {
    video_id: string;
    title: string;
    summary: string;
    description: string;
    date?: string;
    category:string;
  }
  
  export type RequestData = {
    videoId: string;
  }
  
  export type TranscriptResult = { content: string } | Response;
  export type SummaryResult = { data: string } | Response;
  export type SaveResult = { success: true } | Response;