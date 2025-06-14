export interface EventItem {
    id: string;
    text: string;
    score: number;
    comment: string;
    createdAt: Date;
  }

export type ScoringFunction = (text: string) => Promise<{score:number,comment:string;}>;