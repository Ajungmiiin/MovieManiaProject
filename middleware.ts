// import { auth } from '@/auth';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;

  // 현재 로그인 상태
  const isLoggedIn = !!req.auth;

  if (nextUrl.pathname.includes('/login')) {
    if (isLoggedIn) {
      return Response.redirect('https://movie-mania-rouge.vercel.app/');
    }
  }

  if (nextUrl.pathname.includes('/sign-up')) {
    if (isLoggedIn) {
      return Response.redirect('https://movie-mania-rouge.vercel.app/');
    }
  }

  if (nextUrl.pathname.includes('/my')) {
    if (!isLoggedIn) {
      return Response.redirect('https://movie-mania-rouge.vercel.app/login');
    }
  }

  if (nextUrl.pathname.includes('/review')) {
    if (!isLoggedIn) {
      return Response.redirect('https://movie-mania-rouge.vercel.app/login');
    }
  }
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
