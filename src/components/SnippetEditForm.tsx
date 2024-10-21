"use client";
import type { Snippet } from "@prisma/client";

interface SnippetEditFormProps {
  snippet: Snippet;
}

export function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  return <div>Client Component has Snippet {snippet.title}</div>;
}
