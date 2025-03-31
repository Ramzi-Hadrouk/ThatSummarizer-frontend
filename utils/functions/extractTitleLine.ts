export function extractTitleLine(summaryResponse: string): string | null {
    const lines = summaryResponse.split('\n');
  
    // First pass: Check for "##...title..." followed by a bold line
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.startsWith('##') && line.toLowerCase().includes('title')) {
            // Search subsequent lines for the first non-empty line
            for (let j = i + 1; j < lines.length; j++) {
                const nextLine = lines[j].trim();
                if (nextLine === '') continue;
                const boldMatch = nextLine.match(/\*\*(.*?)\*\*/);
                if (boldMatch?.[1]) {
                    return boldMatch[1].trim();
                }
                break; // Only check the first non-empty line
            }
        }
    }
  
    // Second pass: Check for titles directly in bold lines
    for (const line of lines) {
        const trimmedLine = line.trim();
        
        // Case 1: Title is entirely inside bold (e.g., **Title: My Title**)
        const matchInsideBold = trimmedLine.match(/\*\*.*?title:\s*([^*]+)\*\*/i);
        if (matchInsideBold?.[1]) {
            return matchInsideBold[1].trim();
        }
  
        // Case 2: Title is after bold (e.g., **Title:** My Title)
        const matchAfterBold = trimmedLine.match(/\*\*.*?title:\s*\*\*\s*([^*]*)/i);
        if (matchAfterBold?.[1]?.trim()) {
            return matchAfterBold[1].trim();
        }
    }
  
    return null; // No title found
  }