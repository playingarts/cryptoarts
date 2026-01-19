import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * ISR Revalidation endpoint
 *
 * GET /api/revalidate?secret=xxx&pages=["path1","path2"]
 *
 * Revalidates the specified pages using on-demand ISR
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const secret = searchParams.get("secret");
  const pagesParam = searchParams.get("pages");

  // Check for secret to confirm this is a valid request
  if (!secret || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid token" }, { status: 401 });
  }

  if (!pagesParam) {
    return NextResponse.json({ message: "Missing pages parameter" }, { status: 400 });
  }

  try {
    const pages: string[] = JSON.parse(pagesParam);
    if (process.env.NODE_ENV === "development") {
      console.log("revalidating:", pages);
    }

    // Revalidate each page
    for (const page of pages) {
      revalidatePath(page);
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return NextResponse.json(
      { message: "Error revalidating" },
      { status: 500 }
    );
  }
}
