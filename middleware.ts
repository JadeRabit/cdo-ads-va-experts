import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// Rate limiting store (in production, use Redis or Vercel Edge Config)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function getRateLimitKey(request: NextRequest, prefix: string): string {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
             request.headers.get('x-real-ip') ||
             'unknown';
  const userAgent = request.headers.get('user-agent') || 'unknown';
  return `${prefix}:${ip}:${userAgent.slice(0, 50)}`;
}

function checkRateLimit(key: string, maxRequests: number, windowMs: number): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetTime: now + windowMs };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime };
  }

  record.count++;
  return { allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime };
}

// Check if we're in a build/static generation context
function isBuildContext(request: NextRequest): boolean {
  // Vercel sets these during static generation
  return (
    process.env.VERCEL_ENV === 'preview' && process.env.VERCEL_GIT_COMMIT_REF === undefined ||
    process.env.NEXT_PHASE === 'phase-production-build' ||
    request.headers.get('x-vercel-prerender') === '1'
  );
}

export async function middleware(request: NextRequest) {
  // Skip Supabase operations during static generation/build
  const isBuild = isBuildContext(request);
  
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Skip Supabase operations during build/static generation
  if (!isBuild) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL || '',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
              request.cookies.set({ name, value, ...options });
              response = NextResponse.next({
                request: { headers: request.headers },
              });
              response.cookies.set({ name, value, ...options });
            },
            remove(name: string, options: CookieOptions) {
              request.cookies.set({ name, value: '', ...options });
              response = NextResponse.next({
                request: { headers: request.headers },
              });
              response.cookies.set({ name, value: '', ...options });
            },
          },
        }
      );

      await supabase.auth.getSession();

      // Protected admin routes
      if (request.nextUrl.pathname.startsWith('/admin')) {
        try {
          const { data: { user } } = await supabase.auth.getUser();
          
          if (!user) {
            const redirectUrl = new URL('/auth/login', request.url);
            redirectUrl.searchParams.set('redirect', request.nextUrl.pathname);
            return NextResponse.redirect(redirectUrl);
          }

          const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

          if (profile?.role !== 'admin') {
            return NextResponse.redirect(new URL('/', request.url));
          }
        } catch (adminError) {
          console.error('Admin auth check failed:', adminError);
          return NextResponse.redirect(new URL('/', request.url));
        }
      }
    } catch (supabaseError) {
      console.error('Supabase middleware error:', supabaseError);
      // Continue without Supabase features
    }
  }

  // Rate limiting for API routes (skip during build)
  if (!isBuild && request.nextUrl.pathname.startsWith('/api/')) {
    const isBooking = request.nextUrl.pathname.includes('/booking');
    const isInquiry = request.nextUrl.pathname.includes('/inquiry');
    const isDownload = request.nextUrl.pathname.includes('/download');

    if (isBooking || isInquiry) {
      const key = getRateLimitKey(request, 'form-submit');
      const limit = checkRateLimit(key, 5, 60 * 60 * 1000); // 5 requests per hour

      response.headers.set('X-RateLimit-Limit', '5');
      response.headers.set('X-RateLimit-Remaining', limit.remaining.toString());
      response.headers.set('X-RateLimit-Reset', Math.ceil(limit.resetTime / 1000).toString());

      if (!limit.allowed) {
        return new NextResponse(
          JSON.stringify({ error: 'Too many requests. Please try again later.' }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': Math.ceil((Date.now() - Date.now()) / 1000).toString(),
            },
          }
        );
      }
    }

    if (isDownload) {
      const key = getRateLimitKey(request, 'download');
      const limit = checkRateLimit(key, 10, 60 * 60 * 1000); // 10 downloads per hour

      response.headers.set('X-RateLimit-Limit', '10');
      response.headers.set('X-RateLimit-Remaining', limit.remaining.toString());
      response.headers.set('X-RateLimit-Reset', Math.ceil(limit.resetTime / 1000).toString());

      if (!limit.allowed) {
        return new NextResponse(
          JSON.stringify({ error: 'Download rate limit exceeded. Please try again later.' }),
          {
            status: 429,
            headers: {
              'Content-Type': 'application/json',
              'Retry-After': Math.ceil((Date.now() - Date.now()) / 1000).toString(),
            },
          }
        );
      }
    }
  }

  // Security headers (always apply)
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // CSP for inline scripts (Calendly, etc.)
  if (!request.nextUrl.pathname.startsWith('/api/')) {
    response.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://assets.calendly.com https://calendly.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: https: blob:",
        "connect-src 'self' https://*.supabase.co https://api.resend.com https://api.stripe.com",
        "frame-src https://calendly.com https://js.stripe.com",
        "base-uri 'self'",
        "form-action 'self'",
      ].join('; ')
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$|.*\\.webp$).*)',
  ],
};