import { readFile } from "node:fs/promises";
import { basename, join } from "node:path";
import { getChapterBySlug } from "@/content/chapters";

export const runtime = "nodejs";

type SourceDocumentRouteProps = {
  params: Promise<{
    slug: string;
    document: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: SourceDocumentRouteProps,
) {
  const { slug, document } = await params;
  const chapter = getChapterBySlug(slug);

  if (!chapter) {
    return Response.json({ error: "Chapter not found." }, { status: 404 });
  }

  const sourcePathByDocument: Record<string, string> = {
    guide: chapter.sourceGuidePath,
    cheatsheet: chapter.sourceCheatsheetPath,
    "interview-questions": chapter.sourceInterviewPath,
  };
  const sourcePath = sourcePathByDocument[document];

  if (!sourcePath || !sourcePath.startsWith("docs/nextjs/")) {
    return Response.json(
      { error: "Source document not found." },
      { status: 404 },
    );
  }

  const sourceDirectory = join(process.cwd(), "docs", "nextjs");
  const relativeSourcePath = sourcePath.slice("docs/nextjs/".length);
  const absolutePath = join(sourceDirectory, relativeSourcePath);
  const markdown = await readFile(absolutePath, "utf8");

  return new Response(markdown, {
    headers: {
      "Content-Disposition": `inline; filename="${basename(sourcePath)}"`,
      "Content-Type": "text/markdown; charset=utf-8",
    },
  });
}
