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
    params: { id },
  } = props;
  const snippedId = parseInt(id);

  const snippet = await db.snippet.findFirst({
    where: { id: snippedId },
    select: {
      code: true,
      id: true,
      title: true,
    },
  });
  if (!snippet) {
    return notFound();
  }
  return <div>editing snippet with id {String(snippedId)}</div>;
}
