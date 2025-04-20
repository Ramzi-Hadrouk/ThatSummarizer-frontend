'use client'

import { YouTubePlayer } from "@/components/youtube-player"
import { NewRichTextEditor } from "@/components/new-rich-text-editor"
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch";
import { useEffect, useState } from "react";

export default function Page({ params }: { params: { video_id: string } }) {
  const { video_id } = params;
  const [fetchData, setFetchData] = useState<{ data: any[] } | null>(null);

  useEffect(() => {
    const fetchDataFunc = async () => {
      try {
        const data: { data: any[] } = await enhancedFetch(
          `${process.env.BASE_URL || "http://localhost:1337"}/api/summaries?filters[video_id][$eq]=${video_id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            timeout: 20000,
          },
          ResponseType.JSON
        );

        console.log(data);
        setFetchData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataFunc();
  }, [video_id]);

  return (
    <main className="lg:px-8 md:w-[calc(w-full-16em)] bg-sidebar h-full p-6 rounded-lg shadow-md">
      <div>
        My video: {video_id}, {/*fetchData?.data?.[0]?.attributes?.summary || "loading..."*/}
      </div>

      <div className="grid grid-cols-10 gap-3">
        <div className="col-span-10 lg:col-span-7">
          <NewRichTextEditor />
        </div>
        <div className="col-span-3 hidden lg:inline justify-center">
          <YouTubePlayer video_Id={video_id} className="justify-self-center" />
        </div>
      </div>
    </main>
  );
}
