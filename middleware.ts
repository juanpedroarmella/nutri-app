import { type NextRequest } from "next/server";
import { updateSession } from "@/common/utils/supabase/middleware";
import { adminMiddleware } from './core/middleware/admin'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith("/admin")) {
    return await adminMiddleware(request);
  }
  return await updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
  