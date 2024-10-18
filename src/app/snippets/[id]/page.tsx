import { notFound } from "next/navigation";
import { db } from "@/db";
interface SnippetShowPageProps {
  params: {
    id: string;
  };
}
export default async function SnippetShowPage(props: SnippetShowPageProps) {
  await new Promise((r) => setTimeout(r, 2000));

  const {
    params: { id: snippedId },
  } = props;

  const snippet = await db.snippet.findFirst({
    where: { id: Number(snippedId) },
    select: {
      code: true,
      id: true,
      title: true,
    },
  });
  if (!snippet) {
    return notFound();
  }
  return (
    <div>
      Show a Snippet {snippedId}
      <div>{snippet?.id}</div>
      <div>{snippet?.title}</div>
      <div>{snippet?.code}</div>
    </div>
  );
}
