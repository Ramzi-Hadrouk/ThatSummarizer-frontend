export function extractTitleLine(summaryResponse: string): string | null {
    const lines = summaryResponse.split('\n');

    // First pass: Check ##...title... patterns
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        if (line.startsWith('##') && line.toLowerCase().includes('title')) {
            // Check for title in same ## line
            const sameLineMatch = line.match(/##.*title:?[\s]*([^\n#]*)/i);
            if (sameLineMatch?.[1]?.trim()) {
                return sameLineMatch[1].trim();
            }

            // Check next non-empty line for bold
            for (let j = i + 1; j < lines.length; j++) {
                const nextLine = lines[j].trim();
                if (!nextLine) continue;
                const boldMatch = nextLine.match(/\*\*(.*?)\*\*/);
                if (boldMatch?.[1]) return boldMatch[1].trim();
                break;
            }
        }
    }

    // Second pass: Check bold patterns
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Case 1: Title AFTER bold (**Title:** My Title)
        const afterBoldMatch = trimmed.match(/^\*\*.*?title:\s*\*\*\s*(.+)/i);
        if (afterBoldMatch?.[1]) return afterBoldMatch[1].trim();

        // Case 2: Title INSIDE bold (**Title: My Title**)
        const insideBoldMatch = trimmed.match(/^\*\*.*?title:\s*([^*]+)\*\*/i);
        if (insideBoldMatch?.[1]) return insideBoldMatch[1].trim();
    }

    return null;
}