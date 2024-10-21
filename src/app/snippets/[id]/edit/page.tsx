import { notFound } from "next/navigation";
import { db } from "@/db";
import { SnippetEditForm } from "@/components/SnippetEditForm";
interface SnippetShowPageProps {
  params: {
    id: string;
  };
}
export default async function SnippetEditPage(props: SnippetShowPageProps) {
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
  return (
    <div>
      <SnippetEditForm snippet={snippet} />
      editing snippet with id {String(snippedId)}, {snippet.title}
    </div>
  );
}
