/*"use client"

import { useState, useEffect } from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Printer,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface RichTextEditorProps {
  initialContent?: string
  onChange?: (html: string) => void
  className?: string
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  const colors = ["#000000", "#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#8B5CF6", "#EC4899"]
const handlePrint = () => {
    if (editor) {
      const editorContent = editor.getHTML();
      const printWindow = window.open('', '', 'height=600,width=800');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print Editor Content</title>');
        // Optionally include some basic styling for printing
        printWindow.document.write('<style>');
        printWindow.document.write('body { font-family: sans-serif; margin: 20px; }');
        // Add any necessary styles from your prose class that are crucial for printing
        // For example, if you want lists to have markers in print
        printWindow.document.write('ol { list-style-type: decimal; margin-left: 1.5em; }');
        printWindow.document.write('ul { list-style-type: disc; margin-left: 1.5em; }');
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(editorContent);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    }
  };
  return (
    <div className="flex flex-wrap gap-1 p-1 border-b border-gray-200 bg-gray-50 rounded-t-md">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(editor.isActive("bold") ? "bg-gray-200" : "")}
        aria-label="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(editor.isActive("italic") ? "bg-gray-200" : "")}
        aria-label="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(editor.isActive("underline") ? "bg-gray-200" : "")}
        aria-label="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="gap-1" aria-label="Heading">
            {editor.isActive("heading", { level: 1 }) && <Heading1 className="h-4 w-4" />}
            {editor.isActive("heading", { level: 2 }) && <Heading2 className="h-4 w-4" />}
            {editor.isActive("heading", { level: 3 }) && <Heading3 className="h-4 w-4" />}
            {!editor.isActive("heading") && editor.isActive("paragraph") && <Heading1 className="h-4 w-4" />}
             {!editor.isActive("heading") && !editor.isActive("paragraph") && <Heading1 className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={cn(editor.isActive("heading", { level: 1 }) ? "bg-gray-100" : "")}
          >
            <Heading1 className="h-4 w-4 mr-2" /> Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn(editor.isActive("heading", { level: 2 }) ? "bg-gray-100" : "")}
          >
            <Heading2 className="h-4 w-4 mr-2" /> Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={cn(editor.isActive("heading", { level: 3 }) ? "bg-gray-100" : "")}
          >
            <Heading3 className="h-4 w-4 mr-2" /> Heading 3
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={cn(editor.isActive("paragraph") ? "bg-gray-100" : "")}
          >
            Paragraph
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(editor.isActive("bulletList") ? "bg-gray-200" : "")}
        aria-label="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(editor.isActive("orderedList") ? "bg-gray-200" : "")}
        aria-label="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Text Alignment">
            {editor.isActive({ textAlign: "left" }) && <AlignLeft className="h-4 w-4" />}
            {editor.isActive({ textAlign: "center" }) && <AlignCenter className="h-4 w-4" />}
            {editor.isActive({ textAlign: "right" }) && <AlignRight className="h-4 w-4" />}
            {editor.isActive({ textAlign: "justify" }) && <AlignJustify className="h-4 w-4" />}
            {!editor.isActive("textAlign") && <AlignLeft className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={cn(editor.isActive({ textAlign: "left" }) ? "bg-gray-100" : "")}
          >
            <AlignLeft className="h-4 w-4 mr-2" /> Left
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={cn(editor.isActive({ textAlign: "center" }) ? "bg-gray-100" : "")}
          >
            <AlignCenter className="h-4 w-4 mr-2" /> Center
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={cn(editor.isActive({ textAlign: "right" }) ? "bg-gray-100" : "")}
          >
            <AlignRight className="h-4 w-4 mr-2" /> Right
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={cn(editor.isActive({ textAlign: "justify" }) ? "bg-gray-100" : "")}
          >
            <AlignJustify className="h-4 w-4 mr-2" /> Justify
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Text Color">
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <div className="flex flex-wrap gap-1 max-w-[176px]">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => editor.chain().focus().setColor(color).run()}
                className="w-6 h-6 rounded-md border border-gray-200 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
                style={{ backgroundColor: color }}
                aria-label={`Set text color to ${color}`}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>
        
        <Button
        variant="ghost"
        size="icon"
        onClick={handlePrint}
        aria-label="Print"
      >
        <Printer className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function NewRichTextEditor({ initialContent = "", onChange, className }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        paragraph: true,
        bold: true,
        italic: true,
        bulletList: true,
        orderedList: true, // Ensure orderedList is explicitly enabled
        codeBlock: false,
        blockquote: false,
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent, false) // Use false to prevent triggering onUpdate
    }
  }, [editor, initialContent])

  // Add specific styles to the EditorContent to ensure Tiptap's list styles are applied
  // and potentially override conflicting prose styles for lists.
  const editorContentClassNames = cn(
    "prose prose-sm max-w-none p-4 min-h-[200px] focus-within:outline-none",
    // Ensure list markers are visible and have some padding/margin
    "[&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-6" // Added list-decimal for <ol> and ml-6 for <li> margin
  );


  if (!isMounted) {
    return null
  }

  return (
    <div className={cn("border rounded-md", className)}>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className={editorContentClassNames}
      />
    </div>
  )
}

*/


"use client"

import { useState, useEffect } from "react"
import { useEditor, EditorContent, type Editor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Underline from "@tiptap/extension-underline"
import TextAlign from "@tiptap/extension-text-align"
import TextStyle from "@tiptap/extension-text-style"
import Color from "@tiptap/extension-color"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  UnderlineIcon,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Palette,
  Printer,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface RichTextEditorProps {
  initialContent?: string
  onChange?: (html: string) => void
  className?: string
}

const MenuBar = ({ editor }: { editor: Editor | null }) => {
  if (!editor) {
    return null
  }

  const colors = ["#000000", "#EF4444", "#F97316", "#EAB308", "#22C55E", "#3B82F6", "#8B5CF6", "#EC4899"]

  const handlePrint = () => {
    if (editor) {
      const editorContent = editor.getHTML();
      const printWindow = window.open('', '', '');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print Editor Content</title>');
        // Optionally include some basic styling for printing
        printWindow.document.write('<style>');
        printWindow.document.write('body { font-family: sans-serif; margin: 20px; }');
        // Add any necessary styles from your prose class that are crucial for printing
        // For example, if you want lists to have markers in print
        printWindow.document.write('ol { list-style-type: decimal; margin-left: 1.5em; }');
        printWindow.document.write('ul { list-style-type: disc; margin-left: 1.5em; }');
         // Include styles for headings and paragraphs if needed for print
        printWindow.document.write('h1 { font-size: 2em; margin-top: 0.67em; margin-bottom: 0.67em; }');
        printWindow.document.write('h2 { font-size: 1.5em; margin-top: 0.83em; margin-bottom: 0.83em; }');
        printWindow.document.write('h3 { font-size: 1.17em; margin-top: 1em; margin-bottom: 1em; }');
        printWindow.document.write('p { margin-top: 1em; margin-bottom: 1em; }');
        printWindow.document.write('</style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(editorContent);
        printWindow.document.write('</body></html>');
 

        printWindow.document.close();
        printWindow.print();
      }
    }
  };


  return (
    <div className="flex flex-wrap gap-1 p-1 border-b border-gray-200 dark:bg-gray-700 rounded-t-md">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={cn(editor.isActive("bold") ? "bg-gray-200" : "")}
        aria-label="Bold"
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={cn(editor.isActive("italic") ? "bg-gray-200" : "")}
        aria-label="Italic"
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={cn(editor.isActive("underline") ? "bg-gray-200" : "")}
        aria-label="Underline"
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="gap-1" aria-label="Heading">
            {editor.isActive("heading", { level: 1 }) && <Heading1 className="h-4 w-4" />}
            {editor.isActive("heading", { level: 2 }) && <Heading2 className="h-4 w-4" />}
            {editor.isActive("heading", { level: 3 }) && <Heading3 className="h-4 w-4" />}
            {!editor.isActive("heading") && editor.isActive("paragraph") && <Heading1 className="h-4 w-4" />}
             {!editor.isActive("heading") && !editor.isActive("paragraph") && <Heading1 className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={cn(editor.isActive("heading", { level: 1 }) ? "bg-gray-100" : "")}
          >
            <Heading1 className="h-4 w-4 mr-2" /> Heading 1
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={cn(editor.isActive("heading", { level: 2 }) ? "bg-gray-100" : "")}
          >
            <Heading2 className="h-4 w-4 mr-2" /> Heading 2
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={cn(editor.isActive("heading", { level: 3 }) ? "bg-gray-100" : "")}
          >
            <Heading3 className="h-4 w-4 mr-2" /> Heading 3
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setParagraph().run()}
            className={cn(editor.isActive("paragraph") ? "bg-gray-100" : "")}
          >
            Paragraph
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={cn(editor.isActive("bulletList") ? "bg-gray-200" : "")}
        aria-label="Bullet List"
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(editor.isActive("orderedList") ? "bg-gray-200" : "")}
        aria-label="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-gray-300 mx-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Text Alignment">
            {editor.isActive({ textAlign: "left" }) && <AlignLeft className="h-4 w-4" />}
            {editor.isActive({ textAlign: "center" }) && <AlignCenter className="h-4 w-4" />}
            {editor.isActive({ textAlign: "right" }) && <AlignRight className="h-4 w-4" />}
            {editor.isActive({ textAlign: "justify" }) && <AlignJustify className="h-4 w-4" />}
            {!editor.isActive("textAlign") && <AlignLeft className="h-4 w-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            className={cn(editor.isActive({ textAlign: "left" }) ? "bg-gray-100" : "")}
          >
            <AlignLeft className="h-4 w-4 mr-2" /> Left
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            className={cn(editor.isActive({ textAlign: "center" }) ? "bg-gray-100" : "")}
          >
            <AlignCenter className="h-4 w-4 mr-2" /> Center
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            className={cn(editor.isActive({ textAlign: "right" }) ? "bg-gray-100" : "")}
          >
            <AlignRight className="h-4 w-4 mr-2" /> Right
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            className={cn(editor.isActive({ textAlign: "justify" }) ? "bg-gray-100" : "")}
          >
            <AlignJustify className="h-4 w-4 mr-2" /> Justify
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="Text Color">
            <Palette className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <div className="flex flex-wrap gap-1 max-w-[176px]">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => editor.chain().focus().setColor(color).run()}
                className="w-6 h-6 rounded-md border border-gray-200 transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-gray-400"
                style={{ backgroundColor: color }}
                aria-label={`Set text color to ${color}`}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <Button
        variant="ghost"
        size="icon"
        onClick={handlePrint}
        aria-label="Print"
      >
        <Printer className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function NewRichTextEditor({ initialContent = "", onChange, className }: RichTextEditorProps) {
  const [isMounted, setIsMounted] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        paragraph: true,
        bold: true,
        italic: true,
        bulletList: true,
        orderedList: true,
        codeBlock: false,
        blockquote: false,
      }),
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML())
    },
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (editor && initialContent !== editor.getHTML()) {
      editor.commands.setContent(initialContent, false)
    }
  }, [editor, initialContent])

  const editorContentClassNames = cn(
    "prose prose-sm max-w-none p-2 min-h-[600px]  bg-card focus-within:outline-none dark:bg-black-400",
    // Explicitly adding styles for headings, paragraphs, and lists
    // using more specific selectors to potentially override prose defaults
    // depending on your CSS setup.
    "[&_h1]:text-2xl [&_h1]:font-bold [&_h2]:text-xl [&_h2]:font-bold [&_h3]:text-lg [&_h3]:font-bold [&_p]:text-base",
    "[&_ol]:list-decimal [&_ul]:list-disc [&_li]:ml-6"
  );

  


  if (!isMounted) {
    return null
  }

  return (
    <div className={cn("border rounded-md", className)}>
      <MenuBar editor={editor} />
      <EditorContent
        editor={editor}
        className={editorContentClassNames}
      />
      {/* Button to print pure text (HTML) to console */}
      <div  className="grid justify-center bg-sidebar">
    
      </div>
    </div>
  )
}