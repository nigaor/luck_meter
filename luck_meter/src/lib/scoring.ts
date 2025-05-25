import { ScoringFunction } from '@/types';
import { GoogleGenAI } from '@google/genai';

  export const resultScoringFunction:ScoringFunction = async (text: string, category?: string): Promise<number> => {
    
    const aiScoringFunction: ScoringFunction = async (text):Promise<number> => {
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const genAI = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
    let score = 0;
    let adjustedScore = 0;

    const response = await genAI.models.generateContent({
      model: "gemini-2.0-flash",
      contents: {text},
      config: {
        systemInstruction: "あなたはポジティブ心理学の専門家です。以下の出来事をポジティブ度と重要度（個人的な成長や幸福への貢献など）を考慮して-100点から+100点で点数化してください。点数のみを返してください。",
      },
    });

    try {
      if (!response || !response.text) {
      console.warn("AIからの応答が不正です。デフォルトスコアを使用します。");
      return simpleScoringFunction(text); // AI失敗時はシンプルロジックで代替
      }
      score = parseInt(response.text, 10);
      if(isNaN(score)) {
        throw new Error(`AIからの点数解析に失敗しました。:${response.text}`);
      }
      console.log("AI点数化結果:", response.text);
      adjustedScore = Math.max(-100, Math.min(100, score))
      return adjustedScore;
    } catch (error) { 
      console.error("AI点数化エラー:デフォルトスコアを使用します", error);
      return simpleScoringFunction(text); // エラー時もシンプルロジックで代替
    }
  };

//簡易的なキーワードベースの点数化ロジック
  const simpleScoringFunction: ScoringFunction =async (text):Promise<number> => {
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
  return Math.max(-10, Math.min(10, score));
};

    return aiScoringFunction(text);
  }




