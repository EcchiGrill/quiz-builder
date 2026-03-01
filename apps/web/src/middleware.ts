import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname === '/') {
    return NextResponse.redirect(new URL('/quizzes', request.url));
  }
  return NextResponse.next();
};
