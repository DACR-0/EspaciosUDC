import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  const { pathname } = req.nextUrl;

  // Rutas protegidas individuales
  const protectedPaths = [
    "/api/auth/crearuser",
    "/login/crearuser",
  ];

  // Verifica si la ruta es /dashboard o alguna subruta de /dashboard
  const isDashboard = pathname.startsWith("/dashboard");

  // Verifica si la ruta es una de las protegidas explícitas
  const isProtected = protectedPaths.some((path) => pathname.startsWith(path));

  if ((isDashboard || isProtected) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",      // Protege todo lo que esté dentro de /dashboard
    "/api/auth/crearuser",    // Protege la API de crear usuario
    "/login/crearuser",       // Protege la página de crear usuario
  ],
};
// Este middleware protege dashboard, api/auth/crearuser y
// This middleware checks if the user is authenticated before accessing the dashboard. If not, it redirects to the login page.