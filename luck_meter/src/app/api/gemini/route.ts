import { GoogleGenAI} from "@google/genai";
import { NextResponse } from 'next/server';

// Gemini APIの初期設定
const MODEL_NAME = "gemini-2.0-flash";

export async function POST(request: Request) {
  // 1. APIキーの取得と検証
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error("エラー: 環境変数 GEMINI_API_KEY が設定されていません。");
    return NextResponse.json(
      { error: "サーバー側でAPIキーが設定されていません。" },
      { status: 500 }
    );
  }

  try {
    // 2. リクエストボディからプロンプトを取得
    const reqBody = await request.json();
    const userPrompt = reqBody.prompt;

    if (!userPrompt || typeof userPrompt !== 'string') {
      return NextResponse.json(
        { error: "リクエストボディに有効な 'prompt' (文字列) が必要です。" },
        { status: 400 } // Bad Request
      );
    }

    // 3. Gemini APIクライアントの初期化  
    const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const response = await genAI.models.generateContent({
      model: `${MODEL_NAME}`,
      contents: {text: userPrompt},
      config: {
        systemInstruction: "あなたはポジティブ心理学の専門家です。以下の出来事をポジティブ度と重要度（個人的な成長や幸福への貢献など）を考慮して-100点から+100点で点数化してください。点数のみを返してください。",
      },
    });

    // 4. Gemini APIにリクエストを送信
    console.log(`バックエンド: Gemini APIにプロンプトを送信中: "${userPrompt}"`);
    const responseResult = response.text;

    if (!responseResult) {
      console.error("バックエンドエラー: Gemini APIから有効なレスポンスが得られませんでした。");
      return NextResponse.json(
        { error: "AIからの応答がありませんでした。" },
        { status: 502 } // Bad Gateway (AIサービスからの応答不良)
      );
    }

    const generatedText = responseResult;
    console.log(`バックエンド: Gemini APIからの応答: "${generatedText}"`);

    // 5. クライアントに結果を返す
    // 今回のユースケースでは点数のみを期待しているので、JSON形式で返すことを想定
    // AIの応答が {"score": 75} のようなJSON文字列であることを期待
    try {
        const scoreData = JSON.parse(generatedText);
        return NextResponse.json({ score: scoreData.score });
    } catch (parseError) {
        console.error("バックエンドエラー: AIの応答のJSONパースに失敗しました。", parseError);
        // パースに失敗した場合は、生のテキストを返すか、エラーを返す
        return NextResponse.json(
          { error: "AIの応答形式が不正です。", rawResponse: generatedText },
          { status: 500 }
        );
    }

  } catch (error) {
    console.error("バックエンドで予期せぬエラーが発生しました:", error);
    // エラーオブジェクトの構造によって、より詳細な情報をログに出力することも検討
    let errorMessage = "サーバー内部でエラーが発生しました。";
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}