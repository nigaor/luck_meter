import LoginButton from './LoginButton';

export default function PageHeader() {
    return (
        <header className="relative mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 pb-2">
                Luck Meter
            </h1>
            <div className="text-lg text-gray-600 text-left mt-4">
                ・日々の出来事を記録し、AIがポジティブ度をスコア化します。<br/>
                ・「＋出来事を追加」ボタンから新しい出来事を追加することで、
                スコアとAIコメントが自動的に生成されます。<br/>
                ・点数は-100から+100の範囲で、大きな出来事ほど高いスコアがつきます。<br/>
                ※複数ではなく単発の出来事を簡潔に入力してください
            </div>
            <div className="absolute top-0 right-0">
                <LoginButton />
            </div>
        </header>
    );
}