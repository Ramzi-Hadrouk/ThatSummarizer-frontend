'use client'
import { YouTubePlayer } from "@/components/youtube-player"
import RichTextEditor from '@/components/rich-text-editor';

export default async function Page({params,}: {params: Promise<{ video_id: string }>}) {
  const { video_id } = await params
  return(
    <main className=" lg:px-8 md:w-[calc(w-full-16em)] bg-sidebar h-full p-6 rounded-lg shadow-md">

     <div>My video: {video_id}</div>
     <div className=" grid grid-cols-10 gap-3">
      <div className="col-span-10 lg:col-span-7 ">
      <RichTextEditor/>
      </div>
      <div className="col-span-3  hidden lg:inline  justify-center">

      <YouTubePlayer  video_Id={video_id} className=" justify-self-center"/>
      </div>
   
     </div>
    </main>
  )
}