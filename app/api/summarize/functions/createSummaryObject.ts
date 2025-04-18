// src/app/api/summarize/functions/createSummaryObject.ts
import { SummaryData } from "../types";

export function createSummaryObject(videoId: string, summaryResponse: string): SummaryData {
  const parsedSummary = JSON.parse(summaryResponse);
  const title = parsedSummary.title;
  const description = parsedSummary.description;
  const category=parsedSummary.category
  const summaryObject: SummaryData = {
    video_id: videoId,
    title: title?.trim() || "Untitled Video",
    summary: parsedSummary.summary,
    description: description || "No description",
    category:category || "No category"
  };
  
  return summaryObject;
}