// FINAL, INTELLIGENT - File: middleware.ts
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: { headers: request.headers },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (name) => request.cookies.get(name)?.value,
        set: (name, value, options) => {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value, ...options });
        },
        remove: (name, options) => {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  // --- Protected Routes Logic ---
  const protectedRoutes = ['/generate', '/dashboard'];
  if (!user && protectedRoutes.some(path => pathname.startsWith(path))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // --- Auth Routes Logic (The Fix is Here) ---
  const authRoutes = ['/login', '/signup', '/verify-otp', '/forgot-password'];
  if (user && authRoutes.some(path => pathname.startsWith(path))) {
    // EXCEPTION: Allow access to /login if there's a specific message,
    // which means the user just verified their OTP.
    if (pathname === '/login' && request.nextUrl.searchParams.has('message')) {
      return response; // Allow the request to proceed
    }
    // Otherwise, redirect logged-in users away from auth pages.
    return NextResponse.redirect(new URL('/generate', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};