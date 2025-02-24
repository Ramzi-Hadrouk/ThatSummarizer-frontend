"use client"
import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { enhancedFetch, ResponseType } from "@/utils/functions/enhanced-fetch";
import { validateYouTubeUrl } from "@/utils/functions/validate-youtube-url";
import { toast } from "sonner";



export default function VideoUrlForm() {
    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);


    //=================================


    const handleSubmit = useCallback(
        async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            setLoading(true);

            try {
                const videoId = validateYouTubeUrl(videoUrl);
                if (!videoId) throw new Error("Invalid YouTube URL");

                const result = await enhancedFetch<string>(
                    "/api/summarize",
                    {
                        timeout: 20000,
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ videoId }),
                    },
                    ResponseType.JSON
                );

                if (result) toast.success("Summary generated successfully!");
                throw new Error("Failed to generate summary");

            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred.";
                toast.error(errorMessage);
            } finally {
                setLoading(false);
            }
        },
        [videoUrl]
    );



    //=================================

    return (
        <form onSubmit={handleSubmit} >
            <div className="flex  justify-center  border border-spacing-1 items-center space-x-2  shadow-white">
                <Input
                    type="url"
                    placeholder="Enter video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className=" lg:w-80 "
                    disabled={loading}
                />
                <Button type="submit" disabled={loading}>
                    {loading ? "Processing..." : "Summarize"}
                </Button>
            </div>
        </form>
    );
}
