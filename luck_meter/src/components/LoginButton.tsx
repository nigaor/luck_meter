"use client";

import { useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session, status } = useSession();
  const [isLoginClick,setIsLoginClick] = useState(false);

  // 認証状態をチェック中
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const handlePopup = (isClick:boolean) => {
    setIsLoginClick(isClick);
  }

  // ログインしている場合
  if (session) {
    return (
      <div>
        <div onClick={() => handlePopup(true)} className="fixed top-5 right-1 ">
            <img 
              src={session.user?.image ?? '/default-avatar.png'} 
              alt="ユーザーのアイコン"
              className="w-10 h-10 rounded-full" 
            />
          <p>ようこそ, {session.user?.name} さん</p>
          <button onClick={() => signOut()}>ログアウト</button>
        </div>
        <div>
          {isLoginClick &&
            <div className="fixed flex z-50 transition-opacity"
                 onClick={() => handlePopup(false)}>
              <div className="relative top-0 right-0 bg-white p-22 rounded-2xl shadow-xl z-10 max-w-lg w-full m-4">
                <img 
                  src={session.user?.image ?? '/default-avatar.png'} 
                  alt="ユーザーのアイコン"
                  className="relative rounded-full object-scale-down" 
                />
              </div>
            </div>
          }
        </div>
      </div>
    );
  }

  // ログインしていない場合
  // return (
  //   <div className="fixed top-32 right-16">
  //         <img 
  //           src={'/default-avatar.png'} 
  //           alt="ユーザーのアイコン"
  //           className="w-10 h-10 rounded-full" 
  //         />
  //     <p>ログインしていません</p>
  //     <button onClick={() => signIn("google")}>Googleでログイン</button>
  //   </div>
  // );
}