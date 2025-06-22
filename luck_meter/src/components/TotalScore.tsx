interface TotalScoreProps {
  totalScore: number;
}

export default function TotalScore({ totalScore }: TotalScoreProps) {
  const getTotalScoreClass = (score: number): string => {
    if (score > 10) return 'text-green-600';
    if (score > 0) return 'text-green-500';
    if (score === 0) return 'text-gray-600';
    if (score < -10) return 'text-red-600';
    if (score < 0) return 'text-red-500';
    return 'text-gray-600';
  };

  return (
    <div className="my-10 p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">
        現在の合計スコア <br/>
        <span className={`font-bold text-5xl ${getTotalScoreClass(totalScore)}`}>
          {totalScore > 0 ? `+${totalScore}` : totalScore}
        </span>
      </h2>
    </div>
  );
}