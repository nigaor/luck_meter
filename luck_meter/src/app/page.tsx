"use client";

 import { useState, useEffect } from 'react';
 import { EventItem } from '@/types';
 import EventForm from '@/components/EventForm';
 import EventList from '@/components/EventList';
 import { resultScoringFunction } from '@/lib/scoring';
 export default function HomePage() {
   const [events, setEvents] = useState<EventItem[]>([]);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isError, setIsError] = useState(false);
   useEffect(() => {
     const storedEvents = localStorage.getItem('dailyEvents');
     if (storedEvents) {
       try {
         const parsedEvents: EventItem[] = JSON.parse(storedEvents).map((event:EventItem) => ({
           ...event,
           createdAt: new Date(event.createdAt),
         }));
         setEvents(parsedEvents);
       } catch (error) {
         console.error("Failed to parse events from localStorage", error);
         localStorage.removeItem('dailyEvents');
       }
     }
   }, []);
   useEffect(() => {
     if (events.length > 0) {
       localStorage.setItem('dailyEvents', JSON.stringify(events));
     } else {
       // イベントが0件になったらローカルストレージからも削除    
       const storedEvents = localStorage.getItem('dailyEvents');
       if(storedEvents) {
         localStorage.removeItem('dailyEvents');
       }
     }
   }, [events]);

   const openModal = () => setIsModalOpen(true);
   const closeModal = () => {
    setIsModalOpen(false);
    setIsError(false);
  }

   const handleAddEvent = async (eventText: string) => {
    try {
     const data = await resultScoringFunction(eventText);
     const newEvent: EventItem = {
       id: crypto.randomUUID(),
       text: eventText,
       score: typeof data.score === 'number' ? data.score : 0,
       comment: data.comment,
       createdAt: new Date(),
     };
     setEvents((prevEvents) => [...prevEvents, newEvent]);
    } catch (error) {
      console.error("不正な処理", error);
      if (error instanceof Error) {
      setIsError(true);
      }
    }
   };

   const handleDeleteEvent = (id: string) => {
     setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
   };
   const totalScore = events.reduce((sum, event) => sum + event.score, 0);
   const getTotalScoreClass = (score: number): string => {
     if (score > 10) return 'text-green-600';
     if (score > 0) return 'text-green-500';
     if (score === 0) return 'text-gray-600';
     if (score < -10) return 'text-red-600';
     if (score < 0) return 'text-red-500';
     return 'text-gray-600';
   };
   return (
     <div className="min-h-screen bg-gradient-to-br from-slate-100 to-sky-100 py-6 sm:py-12">
       <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
         <header className="mb-12 text-center">
           <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-pink-500 pb-2">
             Luck Meter
           </h1>
           <div className="text-lg text-gray-600 text-left">
             ・日々の出来事を記録し、AIがポジティブ度をスコア化します。<br/>
             ・「＋出来事を追加」ボタンから新しい出来事を追加することで、
             スコアとAIコメントが自動的に生成されます。<br/>
             ・点数は-100から+100の範囲で、大きな出来事ほど高いスコアがつきます。<br/>
           </div>
         </header>
         {events.length > 0 && (
           <div className="my-10 p-6 bg-white rounded-xl shadow-lg">
             <h2 className="text-2xl font-semibold text-gray-700 text-center">
               現在の合計スコア <br/>
               <span className={`font-bold text-5xl ${getTotalScoreClass(totalScore)}`}>{totalScore > 0 ? `+${totalScore}`: totalScore}</span>
             </h2>
           </div>
         )}
         <EventList events={events} onDeleteEvent={handleDeleteEvent} />
         <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
           <p>&copy; {new Date().getFullYear()} Daily Event Scorer. (Sample App)</p>
         </footer>
       </main>
       <button
          onClick={openModal}
          className="fixed top-16 right-16 z-40 flex h-16 w-32 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:scale-120"
          >
            ＋出来事を追加
          </button>
          { (isModalOpen || isError) && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
            onClick={closeModal}
            >
              <div
                className="relative bg-white p-8 rounded-2xl shadow-xl z-10 max-w-lg w-full m-4"
                onClick={(e) => e.stopPropagation()}
              >
                <button 
                  onClick={closeModal}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                  aria-label="閉じる"
                  >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h2 className="text-2xl font-semibold mb-4 text-gray-800">新しい出来事を記録</h2>
                {isError && (
                  <div className="mb-4 text-red-600">
                    文章が正しく読み取れなかったためスコアの取得に<br/>
                    失敗しました。<br/>
                    再度入力してください。
                  </div>
                )}
                <EventForm
                  onAddEvent={(eventText) => {
                    handleAddEvent(eventText);
                    closeModal();
                  }}
                />
              </div>
            </div>
          )}
     </div>
   );
 }