import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
  // Игнорируем API, статику, картинки, фавиконки, админку
  matcher: ['/((?!api|_next/static|_next/image|admin|icon|apple-icon|favicon.ico|.*\\..*).*)'],
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', pathname);

  // Если URL начинается с /ru/ или равен /ru, то язык русский - ничего не перехватываем
  if (pathname.startsWith('/ru/') || pathname === '/ru') {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  // Во всех остальных случаях считаем, что это украинская версия (по умолчанию).
  // Делаем скрытый Rewrite на /uk/..., чтобы App Router поймал папку [lang]
  const newUrl = request.nextUrl.clone();
  newUrl.pathname = `/uk${pathname}`;
  return NextResponse.rewrite(newUrl, { request: { headers: requestHeaders } });
}