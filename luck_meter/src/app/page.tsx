"use client";

 import { useState, useEffect } from 'react';
 import { EventItem } from '@/types';
 import EventForm from '@/components/EventForm';
 import EventList from '@/components/EventList';
 import { resultScoringFunction } from '@/lib/scoring';
 export default function HomePage() {
   const [events, setEvents] = useState<EventItem[]>([]);
   useEffect(() => {
     const storedEvents = localStorage.getItem('dailyEvents');
     if (storedEvents) {
       try {
         const parsedEvents: EventItem[] = JSON.parse(storedEvents).map((event: any) => ({
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
   const handleAddEvent = async (eventText: string, category?: string) => {
     const score = await resultScoringFunction(eventText, category);
     const newEvent: EventItem = {
       id: crypto.randomUUID(),
       text: eventText,
       score: typeof score === 'number' ? score : 0,
       createdAt: new Date(),
       category: category,
     };
     setEvents((prevEvents) => [...prevEvents, newEvent]);
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
           <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 pb-2">
             デイリーイベントスコアラー
           </h1>
           <p className="text-lg text-gray-600">
             日常の出来事を記録して、ポジティブな毎日を！
           </p>
         </header>
         <EventForm onAddEvent={handleAddEvent} />
         {events.length > 0 && (
           <div className="my-10 p-6 bg-white rounded-xl shadow-lg">
             <h2 className="text-2xl font-semibold text-gray-700 text-center">
               今日の合計スコア: <span className={`font-bold ${getTotalScoreClass(totalScore)}`}>{totalScore > 0 ? `+${totalScore}`: totalScore}</span>
             </h2>
           </div>
         )}
         <EventList events={events} onDeleteEvent={handleDeleteEvent} />
         <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
           <p>&copy; {new Date().getFullYear()} Daily Event Scorer. (Sample App)</p>
         </footer>
       </main>
     </div>
   );
 }

// import { GoogleGenAI } from "@google/genai";
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
//  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY }); 

// export default async function HomePage() {
//   const response = await ai.models.generateContent({
//     model: "gemini-2.0-flash",
//     contents: "虹は何色か説明してください",
//     config: {
//       systemInstruction: "You are a cat. Your name is Neko.",
//     },
//   });
//   console.log(response.text); 

//   return (
//     <div>test</div> 
//   );
// }


//  await HomePage(); 