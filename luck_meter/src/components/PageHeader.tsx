import LoginButton from "./LoginButton";

export default function PageHeader() {
  return (
    <header className="mb-12">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-gray-100">
        <h1 className="text-4xl text-center sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500">
          Luck Meter
        </h1>
        <hr className="my-6 border-gray-200" />
        <div className="text-gray-500 leading-relaxed">
          <ul className="space-y-3 list-disc list-inside">
            <li>日々の出来事を記録し、AIがポジティブ度をスコア化します。</li>
            <li>
              「出来事を追加」ボタンから新しい出来事を追加することで、スコアとAIコメントが自動的に生成されます。
            </li>
            <li>
              点数は-100から+100の範囲で、大きな出来事ほど高いスコアがつきます。
            </li>
            <span className="text-sm text-gray-400">
              <span className="font-semibold text-yellow-600">※</span>{" "}
              複数ではなく単発の出来事を簡潔に入力してください
            </span>
          </ul>
        </div>
      </div>
      <div className="absolute top-0 right-0">
        <LoginButton />
      </div>
    </header>
  );
}
