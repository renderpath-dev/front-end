export type ChapterStatus = "Complete" | "In progress" | "Planned";

export type ChapterMetadata = {
  slug: string;
  chapterNumber: number;
  title: string;
  shortTitle: string;
  description: string;
  status: ChapterStatus;
  phase: string;
  tags: readonly string[];
  route: string;
  sourceGuidePath: string;
  sourceCheatsheetPath: string;
  sourceInterviewPath: string;
};

export const chapters: readonly ChapterMetadata[] = [
  {
    slug: "chapter-01-positioning-project-structure-boundaries",
    chapterNumber: 1,
    title: "Positioning, Project Structure, and Execution Boundaries",
    shortTitle: "Execution Boundaries",
    description:
      "Build a reliable mental model for React, Next.js, the App Router, server and browser runtimes, build output, and deployment platforms.",
    status: "Complete",
    phase: "Foundation",
    tags: ["Next.js", "App Router", "Runtime boundaries"],
    route: "/chapters/chapter-01-positioning-project-structure-boundaries",
    sourceGuidePath:
      "docs/nextjs/chapter-01-positioning-project-structure-boundaries/nextjs-chapter-01-learning-guide.md",
    sourceCheatsheetPath:
      "docs/nextjs/chapter-01-positioning-project-structure-boundaries/nextjs-chapter-01-cheatsheet.md",
    sourceInterviewPath:
      "docs/nextjs/chapter-01-positioning-project-structure-boundaries/nextjs-chapter-01-interview-questions.md",
  },
];

export function getChapterBySlug(slug: string) {
  return chapters.find((chapter) => chapter.slug === slug);
}

export function getAllChapterSlugs() {
  return chapters.map((chapter) => chapter.slug);
}
