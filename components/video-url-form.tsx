"use client"

import { useState, useEffect, useCallback } from "react";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import Cookies from 'js-cookie';

export default function VideoUrlForm() {
    const [videoUrl, setVideoUrl] = useState("")
    const { toast } = useToast()
  
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      const logged_state = Cookies.get('that_summarizer_logged_state');
     
      if (logged_state==='true' ) {
        setIsLoggedIn(true);
        console.log('video form Cp | checkLoginStatus : True');
      }
      
      else {
        setIsLoggedIn(false);
        console.log('video form  Cp | checkLoginStatus : False');
      }

    }); 
  
 

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            if (videoUrl) {
                toast({
                    title: "Video URL Submitted",
                    description: `You entered: ${videoUrl}`,
                })
            } else {
                toast({
                    title: "Error",
                    description: "Please enter a video URL",
                    variant: "destructive",
                })
            }
        },
        [videoUrl, toast],
    )

    return (
        <form onSubmit={handleSubmit} className={`flex w-fit max-w-sm items-center space-x-2 ${isLoggedIn ? 'block'  : 'hidden'}`}>
            <Input
                type="url"
                placeholder="Enter video URL"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="flex-grow "
            />
            <Button type="submit" variant={'outline'} className="bg-green-50 text-black">Create Summary</Button>
        </form>
    )
}