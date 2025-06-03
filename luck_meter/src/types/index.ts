export interface EventItem {
    id: string;
    text: string;
    score: number;
    createdAt: Date;
    category?: string;
  }
  
  // 点数化ロジックの型 (将来の拡張用) 
export type ScoringFunction = (text: string, category?: string) => Promise<number>;