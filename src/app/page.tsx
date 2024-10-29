import { db } from "@/db";
import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  return (
    <div>
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippet</h1>
        <Link
          href={"/snippets/new"}
          className="bg-purple-600 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-purple-700"
        >
          New
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        {snippets.map((snippet) => {
          const { id, title } = snippet;
          return (
            <Link
              key={id}
              href={`/snippets/${id}`}
              className="flex justify-between items-center bg-purple-600 text-white font-bold py-2 px-4 rounded shadow-md hover:bg-purple-700"
            >
              <div>{title}</div>
              <div>View</div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
