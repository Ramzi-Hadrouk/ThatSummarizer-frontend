'use client'

import { YouTubePlayer } from "@/components/youtube-player"
import { NewRichTextEditor } from "@/components/new-rich-text-editor"
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch";
import { useEffect, useState } from "react";
import { htmlToMarkdown } from "@/utils/functions/html-to-markdown";
import { markdownToHtml } from "@/utils/functions/markdown-to-html";
import UpdateSummaryButton from "@/components/update-summary-button";
// types for data fetching 
interface DataItem {
  id: number
  attributes: {
    video_id: string;
    title: string;
    summary: string;
    author_id: number | null;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    publishedAt: string; // ISO date string
    date: string; // e.g. "2025-04-19"
    description: string;
    category: string;
  }
}
//***************Helper Sunctions

export default function Page({ params }: { params: { video_id: string } }) {
  const { video_id } = params;
  const [fitchedData, SetFetchedData] = useState<DataItem>();
  const [initialHtml, setInitialHtml] = useState<string>('');
  const [currentMarkdown, setCurrentMarkdown] = useState<string>('');

  useEffect(() => {
    const fetchDataFunc = async () => {
      try {
        const summary: { data: DataItem[] } = await enhancedFetch(
          `${process.env.BASE_URL || "http://localhost:1337"}/api/summaries?filters[video_id][$eq]=${video_id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            timeout: 20000,
          },
          ResponseType.JSON
        );
        const data = summary?.data?.[0];
        const summaryMarkdown = data?.attributes?.summary || '';
        SetFetchedData(data);
        setCurrentMarkdown(summaryMarkdown);
        const html = await markdownToHtml(summaryMarkdown);
        setInitialHtml(html);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFunc();
  }, [video_id]);

  return (
    <main className="lg:px-8 md:w-[calc(w-full-16em)] bg-sidebar h-full p-6 rounded-lg shadow-md">

      <div className="grid grid-cols-10 gap-3 py-4">
        <div className="col-span-10 lg:col-span-7 grid">
          <NewRichTextEditor
            initialContent={initialHtml}
            onChange={(html) => setCurrentMarkdown(htmlToMarkdown(html))}
            className="prose max-w-none border border-gray-200 rounded-md shadow-sm"
          />
         <UpdateSummaryButton  summary_id={fitchedData?.id} summary={currentMarkdown} / > 
        </div>
        <div className="col-span-3 hidden lg:inline justify-center">
          <YouTubePlayer video_Id={video_id} title={fitchedData?.attributes?.title || ''} className="justify-self-center" />
        </div>
      </div>
    </main>
  );
}
