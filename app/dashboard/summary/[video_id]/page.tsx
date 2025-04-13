'use client'
import { YouTubeEmbed } from "@next/third-parties/google"
export default async function Page({params,}: {params: Promise<{ video_id: string }>}) {
  const { video_id } = await params
  return(
    <div className="bg-red-300 h-screen min-w-full  ">
     <div>My video: {video_id}</div>
     <YouTubeEmbed videoid={video_id}/>
    </div>
  )
}