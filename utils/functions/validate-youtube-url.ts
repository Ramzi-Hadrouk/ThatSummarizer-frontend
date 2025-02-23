export function validateYouTubeUrl(videoUrl: string): string | null {
    if (!videoUrl) throw new Error("Invalid YouTube URL");

    try {
        const urlObj = new URL(videoUrl);
        const { hostname, searchParams, pathname } = urlObj;

        if (hostname.includes("youtube.com")) {
            return searchParams.get("v");
        } else if (hostname.includes("youtu.be")) {
            return pathname.substring(1) || null;
        }
    } catch {
        throw new Error("Invalid YouTube URL");
    }

    return null;
}