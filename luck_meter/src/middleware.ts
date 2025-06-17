import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth?.user;

  const { pathname } = req.nextUrl;

  const isOnLoginPage = pathname.startsWith('/login');

  if (isLoggedIn) {
    if (isOnLoginPage) {
      return Response.redirect(new URL('/', req.nextUrl));
    }
    return;
  }

  if (isOnLoginPage) {
    return;
  }
  
  return Response.redirect(new URL('/login', req.nextUrl));

});

export const config = {
  matcher: [
    // APIルート, Next.jsの内部ファイル, 静的ファイルなどを除外する正規表現
    '/((?!api|_next/static|_next/image|.*\\.png$).*)',
  ],
};