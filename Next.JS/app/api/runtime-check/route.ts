export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    runtime: "nodejs",
    hasWindow: typeof window !== "undefined",
    hasDocument: typeof document !== "undefined",
    nodeEnv: process.env.NODE_ENV ?? "unknown",
    generatedAt: new Date().toISOString(),
    site: "Next.js Learning Site",
    learningBoundary:
      "This JSON is created by a Route Handler during server request handling.",
  });
}
