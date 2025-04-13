"use client"

import { YouTubeEmbed } from "@next/third-parties/google"
import { cn } from "@/lib/utils"

interface YouTubePlayerProps {
  video_Id: string
  width?: number |undefined
  height?: number |undefined
  className?: string
  playlabel?: string
  params?: string
}

export function YouTubePlayer({
  video_Id,
  width = undefined ,
  height =200 ,
  className,
  playlabel = "Play video",
  params,
}: YouTubePlayerProps) {
  return (
    <div className={cn(" w-full overflow-hidden rounded-xl border-4 border-red-500 bg-yellow-300 h-56", className)}>
      <YouTubeEmbed
       videoid={video_Id}
        height={height} 
        width={width} 
        playlabel={playlabel} 
        params={params} 
      
        />
    </div>
  )
}
