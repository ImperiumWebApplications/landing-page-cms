import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const wwwRegex = /^www\./;

export function middleware(req: NextRequest) {
  const host = req.headers.get('host');

  if (host && wwwRegex.test(host)) {
    const newHost = host.replace(wwwRegex, '');
    return NextResponse.redirect(
      `https://${newHost}${req.nextUrl.pathname}`,
      301,
    );
  }
}
