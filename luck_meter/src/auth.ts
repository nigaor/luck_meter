// auth.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
// import { PrismaAdapter } from "@auth/prisma-adapter"; // DBと連携する場合
// import { db } from "./lib/db"; // PrismaClientのインスタンス

export const {
  handlers,
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
   //session: { strategy: "jwt" }, // JWTを使う場合
  // adapter: PrismaAdapter(db), // DBと連携する場合
});