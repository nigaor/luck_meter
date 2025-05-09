import { ScoringFunction } from '@/types';

// 簡易的なキーワードベースの点数化ロジック
export const simpleScoringFunction: ScoringFunction = (text) => {
  let score = 0;
  const lowerText = text.toLowerCase();

  // ポジティブキーワード
  const positiveKeywords = ['嬉しい', '楽しい', '最高', '成功', '達成', '感謝', '素晴らしい', 'おいしい', 'リラックス'];
  positiveKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      score += 5;
    }
  });

  // ネガティブキーワード
  const negativeKeywords = ['悲しい', '辛い', '疲れた', '失敗', '問題', '残念', 'ストレス'];
  negativeKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      score -= 3;
    }
  });

  // 長さボーナス (少しだけ)
  if (text.length > 50) {
    score += 1;
  }
  if (text.length > 100) {
    score += 1;
  }

  // 基本スコア（何もなければ0点にならないように）
  if (score === 0 && text.length > 0) {
    score = 1;
  }


  // 点数の範囲を制限 (例: -10 から +10)
  // return Math.max(-10, Math.min(10, score));
  return score; // 今回は制限なし
};

/*
// 将来的にAI APIを呼び出す場合の例 (コメントアウト)
import { GoogleGenerativeAI } from "@google/generative-ai";

export const aiScoringFunction: ScoringFunction = async (text) => {
  // APIキーは環境変数などから安全に読み込むこと
  // const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
  // const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  // const prompt = `以下の出来事をポジティブ度と重要度（個人的な成長や幸福への貢献など）を考慮して-10点から+10点で点数化してください。点数のみを返してください。\n\n出来事：${text}\n\n点数：`;

  try {
    // const result = await model.generateContent(prompt);
    // const response = await result.response;
    // const scoreText = response.text();
    // let score = parseInt(scoreText, 10);
    // if (isNaN(score)) {
    //   console.warn("AIからの点数解析に失敗。デフォルトスコアを使用。Response: ", scoreText);
    //   return simpleScoringFunction(text); // AI失敗時はシンプルロジックで代替
    // }
    // return Math.max(-10, Math.min(10, score));
    console.log("AI Scoring is not implemented in this sample. Using simple scoring.");
    return simpleScoringFunction(text); // このサンプルではAI呼び出しは行わない
  } catch (error) {
    console.error("AI点数化エラー:", error);
    return simpleScoringFunction(text); // エラー時もシンプルロジックで代替
  }
};
*/