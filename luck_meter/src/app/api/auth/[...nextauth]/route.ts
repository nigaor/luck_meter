import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

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

export { handler as GET, handler as POST }