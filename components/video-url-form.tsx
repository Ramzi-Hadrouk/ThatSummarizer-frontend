"use client"
import { LogType, print } from "@/utils/functions/print";
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateSummaryService } from "@/utils/functions/generate-summary-service";
import {enhancedFetch , ResponseType} from "@/utils/functions/enhanced-fetch";


export default function VideoUrlForm() {
    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    //=================================

    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            
            if (!videoUrl) {
                toast({
                    title: "Error",
                    description: "Please enter a video URL",
                    variant: "destructive",
                });
                return;
            }
    
            setLoading(true);
    
            try {
                let videoId: string | null = null;
    
                // Extract videoId from different YouTube URL formats
                try {
                    const urlObj = new URL(videoUrl);
                    if (urlObj.hostname.includes("youtube.com")) {
                        videoId = urlObj.searchParams.get("v");
                    } else if (urlObj.hostname.includes("youtu.be")) {
                        videoId = urlObj.pathname.substring(1);
                    }
                } catch (urlError) {
                    throw new Error("Invalid URL format");
                }
    
                if (!videoId) {
                    throw new Error("Invalid YouTube URL");
                }
    
                // old fetching function
                // const result = await generateSummaryService(videoId);
                // if (result.error) {
                //    throw new Error(result.error.message);
                
                //  new way 
                let result ;
                try{
                   result= await enhancedFetch<{data:string}>(
                    '/api/summarize',
                   
                    {
                        method:'POST',
                        headers: { "Content-Type": "text/plain" },
                        body: JSON.stringify({ videoId })
                    } ,
                    ResponseType.JSON
                )
                }
                catch(error){
                    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
                    return errorMessage;
                }
    
                toast({
                    title: "Summary Created",
                    description: "Summary generated successfully!",
                    variant: "success",
                });
    
                print({
                    location: "video-url-form",
                    type: LogType.Success,
                    mss: "Summary generated successfully",
                    data: result,
                });
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
                
                toast({
                    title: "Error",
                    description: errorMessage,
                    variant: "destructive",
                });
    
                print({
                    location: "video-url-form",
                    type: LogType.Error,
                    mss: "Failed to generate summary",
                    data: errorMessage,
                });
            } finally {
                setLoading(false);
            }
        },
        [videoUrl, toast]
    );
    

    //=================================

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex w-screen max-w-sm items-center space-x-2  shadow-white">
                <Input
                    type="url"
                    placeholder="Enter video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="flex-grow w-72 "
                    disabled={loading}
                />
                <Button type="submit"   disabled={loading}>
                    {loading ? "Processing..." : "Create Summary"}
                </Button>
            </div>
        </form>
    );
}
