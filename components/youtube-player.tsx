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
  height = undefined,
  className,
  playlabel = "Play video",
  params,
}: YouTubePlayerProps) {
  return (
    <span className={cn(` rounded-xl  overflow-hidden `, className)}>
        
      <YouTubeEmbed
       videoid={video_Id}
        height={height} 
        width={width} 
        playlabel={playlabel} 
        params={params} 
      
        />
     
    </span>
  )
}
