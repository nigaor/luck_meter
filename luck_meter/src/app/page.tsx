"use client";

import { useState, useEffect } from 'react';
import { EventItem } from '@/types';
import { resultScoringFunction } from '@/lib/scoring';
import EventList from '@/components/EventList';
import PageHeader from '@/components/PageHeader';
import TotalScore from '@/components/TotalScore';
import AddEventButton from '@/components/AddEventButton';
import AddEventModal from '@/components/AddEventModal';

export default function HomePage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTextError, setIsTextError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/events');
        if (!response.ok) throw new Error('イベントデータの取得に失敗しました');
        const data: EventItem[] = await response.json();
        const formattedEvents = data.map(event => ({ ...event, createdAt: new Date(event.createdAt) }));
        setEvents(formattedEvents);
      } catch (error) {
        console.error("イベントデータの取得エラー:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsTextError(false);
  };

  const handleAddEvent = async (eventText: string) => {
    setIsLoading(true);
    setIsTextError(false);
    try {
      const { score, comment } = await resultScoringFunction(eventText);
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: eventText, score, comment }),
      });
      if (!response.ok) throw new Error('イベントの追加に失敗しました');
      const newEventFromDb: EventItem = await response.json();
      const formattedNewEvent = { ...newEventFromDb, createdAt: new Date(newEventFromDb.createdAt) };
      setEvents(prevEvents => [formattedNewEvent, ...prevEvents]);
    } catch (error) {
      console.error("イベント追加エラー:", error);
      setIsTextError(true);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    const originalEvents = [...events];
    setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    try {
      const response = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('イベントの削除に失敗しました');
    } catch (error) {
      console.error("イベント削除エラー:", error);
      setEvents(originalEvents); 
    }
  };

  const totalScore = events.reduce((sum, event) => sum + (event.score || 0), 0);
  if (isLoading) return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-sky-100">
      <div className="text-gray-600 text-lg">Loading...</div>
    </div>
  )

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 to-sky-100">
      <div className="py-6 sm:py-12">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <PageHeader />
          {events.length > 0 && <TotalScore totalScore={totalScore} />}
          <EventList events={events} onDeleteEvent={handleDeleteEvent} />
        </main>
      </div>
      <AddEventButton onClick={openModal} />
      <AddEventModal
        isOpen={isModalOpen || isTextError}
        onClose={closeModal}
        onAddEvent={handleAddEvent}
        isTextError={isTextError}
      />
    </div>
  );
}