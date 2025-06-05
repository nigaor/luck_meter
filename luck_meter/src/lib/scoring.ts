import { ScoringFunction } from '@/types';

export const resultScoringFunction: ScoringFunction = async (text: string, category?: string): Promise<number> => {
  // API経由でスコア取得
  const aiScoringFunction: ScoringFunction = async (text): Promise<number> => {
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });

      if (!res.ok) {
        console.warn("AI APIからの応答が不正です。デフォルトスコアを使用します。");
        return simpleScoringFunction(text);
      }

      const data = await res.json();
      data.score = parseInt(data.score);
      if (typeof data.score !== 'number' || isNaN(data.score)) {
        throw new Error(`AIからの点数解析に失敗しました。: ${JSON.stringify(data)}`);
      }
      // 必要に応じてスコア範囲を制限
      return Math.max(-100, Math.min(100, data.score));
    } catch (error) {
      console.error("AI点数化エラー:デフォルトスコアを使用します", error);
      return simpleScoringFunction(text);
    }
  };

  // 簡易的なキーワードベースの点数化ロジック
  const simpleScoringFunction: ScoringFunction = async (text): Promise<number> => {
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
    return Math.max(-100, Math.min(100, score));
  };

  return aiScoringFunction(text);
};




