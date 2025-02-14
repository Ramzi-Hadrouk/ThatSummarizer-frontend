import { LogType, print } from "@/utils/functions/print";

export async function generateSummaryService(videoId: string) {
    const url = "/api/summarize";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ videoId }),
        });

        if (!response.ok) {
            throw new Error(`API responded with status ${response.status}`);
        }

        const result = await response.json();
        return { data: result, error: null };
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";

        print({
            location: "generateSummaryService",
            type: LogType.Error,
            mss: "Failed to generate summary:",
            data: errorMessage,
        });

        return { data: null, error: { message: errorMessage } };
    }
}
