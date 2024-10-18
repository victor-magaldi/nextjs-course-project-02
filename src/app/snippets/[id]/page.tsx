// import { db } from "@/db";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function SnippetShowPage(props: any) {
  console.log("props", props);
  return <div>Show a Snippet {props.params.id}</div>;
}
