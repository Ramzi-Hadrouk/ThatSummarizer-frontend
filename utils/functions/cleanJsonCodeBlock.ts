/**
 * Removes Markdown-style code block markers from a JSON string.
 * Specifically, it removes:
 * - The starting ```json (if present)
 * - The ending ``` (if present)
 *
 * @param input - The raw string containing the code block
 * @returns A clean JSON string without the ```json and ``` markers
 */
export function cleanJsonCodeBlock(input: string): string {
    let result = input.trimStart();
  
    if (result.startsWith('```json')) {
      result = result.slice(7); // Remove '```json'
    }
  
    result = result.trimEnd();
  
    if (result.endsWith('```')) {
      result = result.slice(0, -3); // Remove ending '```'
    }
  
    return result.trim();
  }
  