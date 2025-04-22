"use client"

import { YouTubeEmbed } from "@next/third-parties/google"
import { cn } from "@/lib/utils"

interface YouTubePlayerProps {
  video_Id: string
  title:string
  width?: number |undefined
  height?: number |undefined
  className?: string
  playlabel?: string
  params?: string
}

export function YouTubePlayer({
  video_Id,
  title='fsfsfsf',
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
        style="border:solid 1px white ; border-radius: 15px;"
 
        />
       <h3 className="mt-3 text-center font-medium"> {title}</h3>
    </span>
  )
}
