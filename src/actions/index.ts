"use server";

import { redirect } from "next/navigation";
import { db } from "@/db";
import { revalidatePath } from "next/cache";

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    if (!title || !code) {
      throw new Error("fields title and code is required!");
    }

    if (title.length < 3) {
      throw new Error("field title must be longer");
    }

    if (code.length < 10) {
      throw new Error("field code must be longer");
    }

    await db.snippet.create({
      data: {
        title,
        code,
      },
    });
  } catch (err) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong",
      };
    }
  }
  revalidatePath("/");
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
  revalidatePath("/");
  redirect("/");
}
