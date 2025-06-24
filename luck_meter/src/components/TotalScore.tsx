import { format } from "date-fns/format";

interface TotalScoreProps {
  totalScore: number;
  filterType: string;
  selectedDate: Date | undefined;
}

export default function TotalScore({
  totalScore,
  filterType,
  selectedDate,
}: TotalScoreProps) {
  const getTotalScoreClass = (score: number): string => {
    if (score > 500) return "text-green-900";
    if (score > 400) return "text-green-800";
    if (score > 300) return "text-green-700";
    if (score > 200) return "text-green-600";
    if (score > 100) return "text-green-500";
    if (score > 0) return "text-green-400";
    if (score === 0) return "text-gray-600";
    if (score < -500) return "text-red-900";
    if (score < -400) return "text-red-800";
    if (score < -300) return "text-red-700";
    if (score < -200) return "text-red-600";
    if (score < -100) return "text-red-500";
    if (score < -10) return "text-red-400";
    if (score < 0) return "text-red-300";
    return "text-gray-600";
  };

  const filterdScore = (filterType: string) => {
    switch (filterType) {
      case "today":
        return "今日";
      case "thisMonth":
        return "今月";
      case "thisYear":
        return "今年";
      case "date":
        return selectedDate
          ? format(selectedDate, "yyyy年M月d日")
          : "選択された日付";
      case "all":
      default:
        return "全体";
    }
  };

  return (
    <div className="my-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        {filterdScore(filterType)}の合計スコア <br />
        <span
          className={`font-bold text-5xl ${getTotalScoreClass(totalScore)}`}
        >
          {totalScore > 0 ? `+${totalScore}` : totalScore}
        </span>
      </h2>
    </div>
  );
}
