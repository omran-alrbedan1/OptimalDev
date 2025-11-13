"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

interface RichTextContentProps {
  content: string;
}

const RichTextContent = ({ content }: RichTextContentProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    editable: false,
    immediatelyRender: false, // Explicitly set to false to avoid hydration issues
  });

  if (!isMounted) {
    return (
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }

  if (!editor) {
    return (
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextContent;
