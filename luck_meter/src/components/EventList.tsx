import { EventItem } from '@/types';

interface EventListProps {
  events: EventItem[];
  onDeleteEvent: (id: string) => void;
}

export default function EventList({ events, onDeleteEvent }: EventListProps) {
  if (events.length === 0) {
    return (
      <div className="text-center py-10">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">まだ出来事がありません</h3>
        <p className="mt-1 text-sm text-gray-500">最初の出来事を記録してみましょう。</p>
      </div>
    );
  }

  const getScoreClass = (score: number): string => {
    if (score >= 90) return 'bg-yellow-50 text-yellow-600';
    if (score > 0) return 'bg-green-50 text-green-600';
    if (score === 0) return 'bg-gray-100 text-gray-800';
    if (score <= -90) return 'bg-gray-100 text-gray-800';
    if (score < 0) return 'bg-red-50 text-red-700';
    return 'bg-gray-100 text-gray-800'; // デフォルト 
  };

  return (
<div className="flow-root">
  <h2 className="text-xl font-semibold mb-6 text-gray-800">記録された出来事</h2>
  
  <ul role="list" className="space-y-6">
    {events
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .map((event) => (
        <li key={event.id}>
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 space-y-4">
            <div className="relative">
              <div className="flex justify-center">
              <div 
                className={`inline-flex items-baseline px-4 py-1.5 text-base font-bold rounded-full ${getScoreClass(event.score)}`}
              >
                <span className="mr-2 text-sm font-semibold opacity-80">SCORE</span>
                <span className="text-2xl leading-none">
                  {event.score > 0 ? `+${event.score}` : event.score}
                </span>
              </div>
              <button
                onClick={() => onDeleteEvent(event.id)}
                className="absolute top-0 right-0 text-gray-400 hover:text-red-600 transition-colors p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label={`出来事「${event.text}」を削除`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              </div>
            </div>
            <div className="space-y-4 border-t border-gray-100 pt-4">
              <div>
                <p className="text-sm font-semibold text-gray-500 mb-1">あなたの出来事</p>
                <p className="text-gray-800 leading-relaxed bg-pink-100 rounded-2xl p-5">{event.text}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-indigo-500 mb-1">AIのコメント</p>
                <p className="text-gray-800 leading-relaxed bg-indigo-100 rounded-2xl p-5">{event.comment}</p>
              </div>
            </div>

            <div className="text-right text-xs text-gray-400 border-t border-gray-100 pt-2">
              記録日時: {new Date(event.createdAt).toLocaleString('ja-JP')}
            </div>
            
          </div>
        </li>
      ))}
  </ul>
</div>
  );
}