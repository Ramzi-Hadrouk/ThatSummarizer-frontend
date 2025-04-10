export const convertMarkdownToHtml = (markdown: string, showdown: any): string => {
    return showdown?.makeHtml(markdown) || '';
  };
  
  export const convertHtmlToMarkdown = (html: string, turndown: any): string => {
    return turndown?.turndown(html) || '';
  };
  