import React, { useState, useEffect, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { useConverters } from '../hooks/useConverters';
import { convertMarkdownToHtml,convertHtmlToMarkdown } from '@/utils/functions/conversion';
import 'react-quill/dist/quill.snow.css';
import LoadingItem from '@/components/loading-Item';
const ReactQuill = dynamic(() => import('react-quill-new'), {
  ssr: false,
  loading: () => <LoadingItem fontSize='16'/>,
});

const RichTextEditor: React.FC = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [markdownContent, setMarkdownContent] = useState('');

  const { turndown, showdown, loading, error } = useConverters();

  const toHtml = useCallback((md: string) => convertMarkdownToHtml(md, showdown), [showdown]);
  const toMarkdown = useCallback((html: string) => convertHtmlToMarkdown(html, turndown), [turndown]);

  useEffect(() => {
    if (showdown) {
      const initialMarkdown = '# Sample Markdown\n\nThis is a sample.';
      setMarkdownContent(initialMarkdown);
      setHtmlContent(toHtml(initialMarkdown));
    }
  }, [showdown, toHtml]);

  const handleEditorChange = (content: string) => setHtmlContent(content);
  const handleSave = () => setMarkdownContent(toMarkdown(htmlContent));

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}. Please refresh the page.</div>;

  return (
    <div className="w-full">
      <style>{`
        .ql-editor {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          line-height: 1.5;
          min-height: 200px;
        }
      `}</style>
      <ReactQuill value={htmlContent} onChange={handleEditorChange} />
      <button onClick={handleSave}>Save</button>
      <div>
        <h3>Markdown Output:</h3>
        <pre>{markdownContent}</pre>
      </div>
    </div>
  );
};

export default RichTextEditor;

/*
import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

type TurndownService = any;

const initialMarkdown = `
# Welcome to the Editor
This is a **sample** markdown text.

## Task List
- [x] Learn ReactQuill
- [ ] Test Turndown and Showdown
- [ ] Customize your editor

> Note: Edit this text with the editor below!
`;

// Updated styles with font family and line spacing
const editorStyles = `
  .ql-editor {
    font-size: 1.125rem;
    line-height: 1.8; 
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  
  .ql-container {
    width: 100% !important;
  }
  
  .ql-toolbar {
    width: 100% !important;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }


  .markdown-preview {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    line-height: 1.6;
  }
`;

export default function RichTextEditor() {
  const [htmlContent, setHtmlContent] = useState("");
  const [markdownContent, setMarkdownContent] = useState("");
  const [turndownService, setTurndownService] = useState<TurndownService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadModules = async () => {
      try {
        const [{ default: Turndown }, { default: Showdown }] = await Promise.all([
          import("turndown"),
          import("showdown"),
        ]);

        const showdownConverter = new Showdown.Converter();
        const initialHtml = showdownConverter.makeHtml(initialMarkdown);

        const turndownInstance = new Turndown({
          headingStyle: "atx",
          hr: "---",
          bulletListMarker: "-",
          codeBlockStyle: "fenced",
        });

        setTurndownService(turndownInstance);
        setHtmlContent(initialHtml);
        setMarkdownContent(initialMarkdown);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load required modules");
        console.error("Module loading error:", err);
        setIsLoading(false);
      }
    };

    loadModules();
  }, []);

  const handleSave = useCallback(() => {
    if (!turndownService || !htmlContent.trim()) {
      setError("Editor content is empty or converter not ready");
      return;
    }

    try {
      const markdown = turndownService.turndown(htmlContent);
      setMarkdownContent(markdown);
      setError("");
      console.log("Saved Markdown:", markdown);
    } catch (err) {
      console.error("Conversion error:", err);
      setError(`Conversion failed: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  }, [turndownService, htmlContent]);

  if (error) {
    return (
      <div className="w-full p-4 text-red-500">
        Error: {error}
        <Button 
          className="mt-4 block"
          onClick={() => window.location.reload()}
        >
          Refresh Page
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full p-4">
      <style>{editorStyles}</style>
      {isLoading ? (
        <div>Initializing editor...</div>
      ) : (
        <>
          <ReactQuill
            value={htmlContent}
            onChange={setHtmlContent}
            theme="snow"
            className="min-h-[300px] bg-white w-full mb-6" 
          />
          
          <Button
            className="mt-4"
            onClick={handleSave}
            disabled={!turndownService}
          >
            Save as Markdown
          </Button>

          {markdownContent && (
            <div className="mt-6 p-4 border rounded-lg bg-gray-100 markdown-preview">
              <h3 className="font-bold mb-2">Markdown Output:</h3>
              <pre className="whitespace-pre-wrap font-mono text-sm">
                {markdownContent}
              </pre>
            </div>
          )}
        </>
      )}
    </div>
  );
}


*/