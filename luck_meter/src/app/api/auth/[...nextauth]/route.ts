import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { handlers } from "@/auth";

export const { GET, POST } = handlers;

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // 他のプロバイダー（GitHubなど）もここに追加できる
  ],
    pages: {
    signIn: '/login', // ログインページのパスを指定
  },
})
