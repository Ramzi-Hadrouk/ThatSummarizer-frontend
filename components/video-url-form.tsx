"use client"
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch";
import { validateYouTubeUrl } from "@/utils/functions/validate-youtube-url";
import { toast } from "sonner";

type SummaryResponse = {
  success: boolean;
  data?: string;
  error?: string;
};

export default function VideoUrlForm() {
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      try {
        const videoId = validateYouTubeUrl(videoUrl);
        if (!videoId) {
          toast.error("Invalid YouTube URL format");
          return;
        }

        const result = await enhancedFetch<SummaryResponse>(
          "/api/summarize",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videoId }),
            timeout: 25000,
          },
          ResponseType.JSON
        );

        if (!result.ok) {
          const errorData = await result.json();
          throw new Error(errorData?.error || "Request failed");
        }

        const responseData = await result.json();
        
        if (responseData.success) {
          toast.success("Summary generated successfully!");
          // Handle successful summary data here
          console.log("Summary data:", responseData.data);
        } else {
          toast.error(responseData.error || "Unknown error occurred");
        }

      } catch (error) {
        let errorMessage = "An unexpected error occurred";
        
        if (error instanceof Error) {
          errorMessage = error.message;
          
          // Handle specific error cases
          if (errorMessage.includes("timeout")) {
            errorMessage = "Request timed out. Please try again.";
          }
          else if (errorMessage.includes("Transcript not available")) {
            errorMessage = "This video doesn't have a transcript available";
          }
        }

        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    [videoUrl]
  );

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-center border border-spacing-1 items-center space-x-2 shadow-white">
        <Input
          type="url"
          placeholder="Enter YouTube video URL"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="lg:w-80"
          disabled={loading}
          pattern="^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+"
          required
        />
        <Button 
          type="submit" 
          disabled={loading}
          aria-label={loading ? "Processing summary" : "Generate summary"}
        >
          {loading ? "Processing..." : "Summarize"}
        </Button>
      </div>
    </form>
  );
}