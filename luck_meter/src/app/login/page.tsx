import { auth } from "@/auth";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm"; 

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/");
  }
  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Luck Meterへようこそ
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            ログインして、あなたの毎日を記録しましょう
          </p>
        </div>
        <LoginForm /> {/* クライアントコンポーネントを配置 */}
      </div>
    </main>
  );
}
