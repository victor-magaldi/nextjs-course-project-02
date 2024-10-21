"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  if (!title || !code) {
    return {
      message: "fields title and code is required!",
    };
  }

  if (title.length < 3) {
    return {
      message: "field title must be longer",
    };
  }

  if (code.length < 10) {
    return {
      message: "field code must be longer",
    };
  }

  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });
  console.log("snippet", snippet);

  redirect("/");
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
