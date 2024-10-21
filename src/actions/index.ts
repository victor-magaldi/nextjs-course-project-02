"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  console.log(formState, formData);
  // const title = formData.get("title") as string;
  // const code = formData.get("code") as string;

  // const snippet = await db.snippet.create({
  //   data: {
  //     title,
  //     code,
  //   },
  // });
  // console.log("snippet", snippet);

  // redirect("/");
  return {
    message: "Title must be Longer",
  };
}

export async function editSnippet(id: number, code: string) {
  console.log("data editSnippet", id, code);
  await db.snippet.update({
    where: { id },
    data: { code },
  });

  redirect(`/snippets/${id}`);
}

export async function deleteSnippet(id: number) {
  console.log("data editSnippet", id);
  await db.snippet.delete({
    where: { id },
  });

  redirect(`/`);
}
