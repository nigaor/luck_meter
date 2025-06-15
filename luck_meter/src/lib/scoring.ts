import { ScoringFunction } from '@/types';

export const resultScoringFunction: ScoringFunction = async (text: string): Promise<{score:number;comment:string}> => {
  // API経由でスコア取得
  const aiScoringFunction: ScoringFunction = async (text): Promise<{score:number; comment:string}> => {
    try {
      const res = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({ error: "サーバーからの応答が不正です。"}));
        throw new Error(errorData.error || `サーバーエラー：${res.status}`)
      }

      const data = await res.json();
      data.score = parseInt(data.score);
      if (typeof data.score !== 'number' || isNaN(data.score)) {
        throw new Error(`AIからの点数解析に失敗しました。: ${JSON.stringify(data)}`);
      }
      // 必要に応じてスコア範囲を制限
      return { score: Math.max(-100, Math.min(100, data.score)), comment: data.comment };
    } catch (error) {
    console.error("AIスコアリング関数でエラー:", error);
    throw error;
    }
  };

  return aiScoringFunction(text);
};




