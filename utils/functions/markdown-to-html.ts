
import { marked } from 'marked';
type returnType= string | Promise<string>
export   function markdownToHtml(markdownText: string):returnType{
  return marked.parse(markdownText);
}