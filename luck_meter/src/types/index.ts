export interface EventItem {
    id: string;
    text: string;
    score: number;
    createdAt: Date;
  }

export type ScoringFunction = (text: string) => Promise<number>;