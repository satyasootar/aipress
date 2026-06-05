"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Bold, Italic, Heading2, List, ListOrdered } from "lucide-react";

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 p-2 border-b border-white/10 bg-zinc-900/50">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-sm transition-colors ${editor.isActive("bold") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
      >
        <Bold className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-sm transition-colors ${editor.isActive("italic") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
      >
        <Italic className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-white/10 self-center mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-sm transition-colors ${editor.isActive("heading", { level: 2 }) ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
      >
        <Heading2 className="w-4 h-4" />
      </button>
      <div className="w-px h-6 bg-white/10 self-center mx-1" />
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-sm transition-colors ${editor.isActive("bulletList") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
      >
        <List className="w-4 h-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-sm transition-colors ${editor.isActive("orderedList") ? "bg-white/10 text-white" : "text-gray-400 hover:text-white hover:bg-white/5"}`}
      >
        <ListOrdered className="w-4 h-4" />
      </button>
    </div>
  );
};

export default function TiptapEditor({ content, onChange }: TiptapEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-invert prose-sm sm:prose-base focus:outline-none max-w-none min-h-[300px] p-6 text-gray-300 font-serif leading-relaxed",
      },
    },
  });

  return (
    <div className="border border-white/10 rounded-sm overflow-hidden bg-zinc-900/30">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
