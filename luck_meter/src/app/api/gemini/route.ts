import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const MODEL_NAME = "gemini-2.0-flash";

export async function POST(request: Request) {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    console.error("エラー: 環境変数 GEMINI_API_KEY が設定されていません。");
    return NextResponse.json(
      { error: "サーバー側でAPIキーが設定されていません。" },
      { status: 500 }
    );
  }

  try {
    const reqBody = await request.json();
    const userPrompt = reqBody.prompt;

    if (!userPrompt || typeof userPrompt !== "string") {
      return NextResponse.json(
        { error: "リクエストボディに有効な 'prompt' (文字列) が必要です。" },
        { status: 400 }
      );
    }

    const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    const response = await genAI.models.generateContent({
      model: `${MODEL_NAME}`,
      contents: { text: userPrompt },
      config: {
        systemInstruction:
          'あなたはポジティブ心理学の専門家です。以下の出来事をポジティブ度と重要度を考慮して、人が死ぬレベルが-100点、何も起きない通常が0点、人生最大レベルの幸福を+100点とした場合を参考に-100点から+100点で1桁単位で数字が細かくなるように点数化してください。下ネタは0点にしてください。またその点数を付けた理由を3行程度のユーモアのある親しみやすく可愛い文章で具体的に出来事になぞらえて評価してください。応答は必ず以下のJSON形式で返してください。\n例: {"score": 75, "comment": "新しい発見があり、とても充実した一日でしたね✨"}',
      },
    });

    console.log(
      `バックエンド: Gemini APIにプロンプトを送信中: "${userPrompt}"`
    );
    const responseResult = response.text;

    if (!responseResult) {
      console.error(
        "バックエンドエラー: Gemini APIから有効なレスポンスが得られませんでした。"
      );
      return NextResponse.json(
        { error: "AIからの応答がありませんでした。" },
        { status: 502 }
      );
    }

    const generatedText = responseResult.replace(/\n/, "");
    console.log(`バックエンド: Gemini APIからの応答: "${generatedText}"`);

    try {
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        console.error("バックエンドエラー: AIの応答がJSON形式ではありません。");
        return NextResponse.json(
          { error: "AIの応答が不正な形式です。", rawResponse: jsonMatch },
          { status: 500 }
        );
      }

      const jsonString = jsonMatch[0];
      console.log(`バックエンド: AIの応答から抽出したJSON: ${jsonString}`);

      try {
        const resultData = JSON.parse(jsonString);
        return NextResponse.json({
          score: resultData.score,
          comment: resultData.comment,
        });
      } catch (parseError) {
        console.error(
          "バックエンドエラー: AIの応答のJSONパースに失敗しました。",
          parseError
        );
        return NextResponse.json(
          { error: "AIの応答形式が不正です。", rawResponse: jsonString },
          { status: 500 }
        );
      }
    } catch (error) {
      console.error("バックエンドで予期せぬエラーが発生しました:", error);
      let errorMessage = "サーバー内部でエラーが発生しました。";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  } catch (error) {
    console.error("バックエンドで予期せぬエラーが発生しました:", error);
    let errorMessage = "サーバー内部でエラーが発生しました。";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
