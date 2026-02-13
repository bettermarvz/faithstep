import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function isMobile(userAgent: string) {
  return /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
    userAgent,
  );
}

export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const auth = [
    "/auth/login",
    "/auth/signup",
    "/auth/confirm-email",
    "/account/setup",
  ];
  let supabaseResponse = NextResponse.next({
    request,
  });

  // With Fluid compute, don't put this client in a global environment
  // variable. Always create a new one on each request.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Do not run code between createServerClient and
  // supabase.auth.getClaims(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: If you remove getClaims() and you use server-side rendering
  // with the Supabase client, your users may be randomly logged out.
  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  const ua = request.headers.get("user-agent") || "";
  const mobile = isMobile(ua);

  const url = request.nextUrl.clone();

  console.log("User Agent:", ua);
  console.log("Is Mobile:", pathname, mobile);

  if (mobile && !pathname.startsWith("/auth")) {
    url.pathname = `/mob${pathname}`;
  } else {
    url.pathname = pathname;
  }
  return NextResponse.rewrite(url);
  // if (
  //   !user &&
  //   !request.nextUrl.pathname.startsWith("/auth/login") &&
  //   !request.nextUrl.pathname.startsWith("/auth/signup") &&
  //   !request.nextUrl.pathname.startsWith("/auth/confirm-email") &&
  //   !request.nextUrl.pathname.startsWith("/account/setup") &&
  //   !request.nextUrl.pathname.startsWith("/")
  // ) {
  //   // no user, potentially respond by redirecting the user to the login page
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/";
  //   return NextResponse.redirect(url);
  // }

  // if (user && request.nextUrl.pathname === "/") {
  //   const url = request.nextUrl.clone();
  //   url.pathname = "/overview";
  //   return NextResponse.redirect(url);
  // }

  // IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
  // creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
