"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session, status } = useSession();

  // 認証状態をチェック中
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // ログインしている場合
  if (session) {
    return (
      <div className="fixed top-32 right-16 ">
        <p>ようこそ, {session.user?.name} さん</p>
        <button onClick={() => signOut()}>ログアウト</button>
      </div>
    );
  }

  // ログインしていない場合
  return (
    <div className="fixed top-32 right-16">
      <p>ログインしていません</p>
      <button onClick={() => signIn("google")}>Googleでログイン</button>
    </div>
  );
}