// Improved VideoUrlForm component
"use client"
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch";
import { validateYouTubeUrl } from "@/utils/functions/validate-youtube-url";
import { useToast } from "@/hooks/use-toast";
import { set, ZodError } from "zod";
 import LoadingItem from "@/components/loading-Item";
type SummaryResponse = {
  success: boolean;
  status?: number;
  data?: string;
  error?: string;
};
interface CardViewProps {
  currentstate:number,
  setCurrentstate: (number: number) => void;
}

export default function VideoUrlForm({currentstate, setCurrentstate }: CardViewProps) {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      try {
        const videoId = validateYouTubeUrl(videoUrl);
        if (!videoId) {
          toast({
            title: "Invalid URL",
            description: "Please enter a valid YouTube URL",
            variant: "destructive",
          });
          return;
        }


        const data: SummaryResponse = await enhancedFetch(
          "/api/summarize",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videoId }),
            timeout: 25000,
          },
          ResponseType.JSON
        );

        if (!data.success) {
          throw new Error(data.error || "Request failed");
        }
        if(data.status===201){
          toast({
            title: "Success!",
            description: "Summary Already Exist",
            variant:'success',
          });
        
        }
        else{
        toast({
          title: "Success!",
          description: "Summary generated successfully",
          variant:'success',
        });

      }
      setCurrentstate(currentstate+1)

      } catch (error) {
        let title = "Error";
        let description = "An unexpected error occurred";
        let status: number | undefined;

        if (error instanceof ZodError) {
          title = "Validation Error";
          description = error.errors[0]?.message || "Invalid input";
        } else if (error instanceof Error) {
          description =error.message;
          
          if (error.message.includes("Network Error")) {
            title = "Connection Failed";
            status = 503;
          } else if (error.message.includes("timeout")) {
            title = "Request Timeout";
            status = 504;
          }
        }

        toast({
          title: status ? `${title} (${status})` : title,
          description,
          variant: "destructive",
        });

      } finally {
        setLoading(false);
      }
    },
    [videoUrl, toast]
  );

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="flex gap-0 items-center ">
        <Input
          type="url"
          placeholder="Enter YouTube video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="flex-1 py-6  bg-sidebar w-4 focus:ring-2 focus:ring-blue-500"
          disabled={loading}
          pattern="^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+"
          required
        />
        
        <Button 
          type="submit" 
          disabled={loading}
          className="py-6 md:px-3 "
          aria-live="polite"
        >
          {loading ? (<LoadingItem fontSize="16"/>) : "Summarize"}
        </Button>
      </div>

    </form>
  );
}