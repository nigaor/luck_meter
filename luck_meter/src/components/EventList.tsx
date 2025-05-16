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
    if (score > 5) return 'bg-green-100 text-green-800';
    if (score > 0) return 'bg-green-50 text-green-700';
    if (score === 0) return 'bg-gray-100 text-gray-800';
    if (score < -5) return 'bg-red-100 text-red-800';
    if (score < 0) return 'bg-red-50 text-red-700';
    return 'bg-gray-100 text-gray-800'; // デフォルト   みじ
  };

  return (
    <div className="flow-root">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">記録された出来事</h2>
      <ul role="list" className="-mb-8">
        {events
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
          .map((event, eventIdx) => (
            <li key={event.id}>
              <div className="relative pb-8">
                {eventIdx !== events.length - 1 ? (
                  <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  <div>
                    <div
                      className={`relative px-2 py-1 text-xs font-semibold rounded-full ring-1 ring-inset ${getScoreClass(event.score)}`}
                    >
                      スコア: {event.score > 0 ? `+${event.score}` : event.score}
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{event.text}</p>
                      </div>
                      <p className="mt-0.5 text-xs text-gray-500">
                        記録日時: {new Date(event.createdAt).toLocaleString('ja-JP')}
                      </p>
                    </div>
                    {event.category && (
                      <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {event.category}
                      </span>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => onDeleteEvent(event.id)}
                      className="ml-2 text-gray-400 hover:text-red-600 transition-colors p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                      aria-label={`出来事「${event.text}」を削除`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </li>
        ))}
      </ul>
    </div>
  );
}