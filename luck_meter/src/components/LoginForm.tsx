"use client";

import { signIn } from "next-auth/react";
import LoginButton from "@/components/LoginButton";

export default function LoginForm() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-gray-600">
        Googleアカウントでログインができます。
      </p>
      <button
        // クリックするとGoogle認証フローが開始される
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
      >
        Googleでログイン
      </button>
      <LoginButton />
    </div>
  );
}
