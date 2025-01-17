import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import * as actions from "@/actions";
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
  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);
  return (
    <div>
      <div className="flex m-4 justify-between items-center ">
        <h1 className="text-xl font-bold">{snippet?.title}</h1>
        <div className="flex gap-4">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-purple-700"
          >
            Edit
          </Link>
          <form action={deleteSnippetAction}>
            <button
              type="submit"
              className="bg-purple-600 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-purple-700"
            >
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    return {
      id: snippet.id.toString(),
    };
  });
}
