"use client"

import { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { generateSummaryService } from "@/utils/functions/generate-summary-service";

export default function VideoUrlForm() {
    const [videoUrl, setVideoUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

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
                // Extract videoId from the video URL
                const videoId = new URL(videoUrl).searchParams.get("v");
                if (!videoId) {
                    toast({
                        title: "Error",
                        description: "Invalid YouTube URL",
                        variant: "destructive",
                    });
                    return;
                }

                const result = await generateSummaryService(videoId);
                if (result.error) {
                    toast({
                        title: "Error",
                        description: result.error.message,
                        variant: "destructive",
                    });
                } else {
                    toast({
                        title: "Summary Created",
                        description: "Summary generated successfully!",
                    });
                }
            } catch (error) {
                toast({
                    title: "Error",
                    description: "An unexpected error occurred.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        },
        [videoUrl, toast]
    );

    return (
        <form onSubmit={handleSubmit}>
            <div className="flex w-screen max-w-sm items-center space-x-2">
                <Input
                    type="url"
                    placeholder="Enter video URL"
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="flex-grow w-72"
                    disabled={loading}
                />
                <Button type="submit" variant="outline" className="bg-green-50 text-black" disabled={loading}>
                    {loading ? "Processing..." : "Create Summary"}
                </Button>
            </div>
        </form>
    );
}
