// utils/functions/htmlToMarkdown.ts
import TurndownService from 'turndown';

export function htmlToMarkdown(html: string): string {
  const turndownService = new TurndownService();
  return turndownService.turndown(html);
}
