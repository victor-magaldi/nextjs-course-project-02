"use client";

import type { Snippet } from "@prisma/client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import * as actions from "@/actions";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };
  console.log(code);
  const editSnippetAction = actions.editSnippet.bind(null, snippet.id, code);

  return (
    <div>
      Client Component has Snippet {snippet.title}
      <Editor
        height="40vh"
        defaultLanguage="javascript"
        theme="vs-dark"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <form action={editSnippetAction}>
        <button
          type="submit"
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-purple-700"
        >
          Save
        </button>
      </form>
    </div>
  );
}
