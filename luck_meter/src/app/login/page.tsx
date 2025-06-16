"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-6">ログインが必要です</h1>
      <p className="mb-8">このページを閲覧するには、ログインしてください。</p>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })} // ログイン後はホームページにリダイレクト
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700"
      >
        Googleでログイン
      </button>
      {/* 他のログイン方法（GitHubなど）のボタンもここに追加できます */}
    </div>
  );
}