import type { NextAuthConfig } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // // 認証ロジックをここに記述（後述）
  // callbacks: {
  //   authorized({ auth, request: { nextUrl } }) {
  //     const isLoggedIn = !!auth?.user;
  //     const isOnLoginPage = nextUrl.pathname.startsWith("/login");
  //     const isOnDashboard = nextUrl.pathname.startsWith("/dashboard"); 

  //     if (isOnDashboard) {
  //       if (isLoggedIn) return true;
  //       return false;
  //     } else if (isOnLoginPage) {
  //       if (isLoggedIn) {
  //         return Response.redirect(new URL("/", nextUrl));
  //       }
  //       return true;
  //     }

  //     return true;
  //   },
  // },
} satisfies NextAuthConfig;