"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const [isLoginClick, setIsLoginClick] = useState(false);

  // 認証状態をチェック中
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handlePopup = (isClick: boolean) => {
    setIsLoginClick(isClick);
  };

  // ログインしている場合
  if (session) {
    return (
      <div>
        <div className="fixed top-2 right-2 p-4 flex items-center justify-end z-10">
          <div
            onClick={() => handlePopup(true)}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <img
              src={session.user?.image ?? "/default-avatar.png"}
              alt="ユーザーのアイコン"
              className="w-10 h-auto rounded-full items-center justufy-end"
            />
          </div>
        </div>
        <div>
          {isLoginClick && (
            <div
              className="fixed inset-0 flex items-start justify-end z-50 transition-opacity"
              onClick={() => handlePopup(false)}
            >
              <div
                className="relative bg-white rounded-2xl shadow-xl z-10 p-6 w-80 space-y-4 mt-10 mr-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center space-x-6">
                  <img
                    src={session.user?.image ?? "/default-avatar.png"}
                    alt="ユーザーのアイコン"
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {session.user?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
                <hr />
                <div className="flex justify-end">
                  <button
                    onClick={() => signOut()}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    ログアウト
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}
