"use client";

import { useState, useEffect } from "react";
import { isToday, isThisMonth, isThisYear } from "date-fns";
import { EventItem } from "@/types";
import { resultScoringFunction } from "@/lib/scoring";
import EventList from "@/components/EventList";
import PageHeader from "@/components/PageHeader";
import TotalScore from "@/components/TotalScore";
import AddEventButton from "@/components/AddEventButton";
import AddEventModal from "@/components/AddEventModal";
import FilterControls, { FilterType } from "@/components/FilterControls";
import CalendarModal from "@/components/CalendarModal";

export default function HomePage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTextError, setIsTextError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterType, setFilterType] = useState<FilterType>("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/events");
        if (!response.ok) throw new Error("イベントデータの取得に失敗しました");
        const data: EventItem[] = await response.json();
        const formattedEvents = data.map((event) => ({
          ...event,
          createdAt: new Date(event.createdAt),
        }));
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
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: eventText, score, comment }),
      });
      if (!response.ok) throw new Error("イベントの追加に失敗しました");
      const newEventFromDb: EventItem = await response.json();
      const formattedNewEvent = {
        ...newEventFromDb,
        createdAt: new Date(newEventFromDb.createdAt),
      };
      setEvents((prevEvents) => [formattedNewEvent, ...prevEvents]);
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
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    try {
      const response = await fetch(`/api/events/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("イベントの削除に失敗しました");
    } catch (error) {
      console.error("イベント削除エラー:", error);
      setEvents(originalEvents);
    }
  };
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setFilterType("date");
    setIsCalendarOpen(false);
  };

  const handleFilterChange = (filter: FilterType) => {
    setFilterType(filter);
    if (filter !== "date") {
      setSelectedDate(undefined);
    }
  };

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.createdAt);
    switch (filterType) {
      case "today":
        return isToday(eventDate);
      case "thisMonth":
        return isThisMonth(eventDate);
      case "thisYear":
        return isThisYear(eventDate);
      case "date":
        // selectedDateが未選択の場合は何も表示しない（またはすべて表示）
        return selectedDate
          ? eventDate.toDateString() === selectedDate.toDateString()
          : true;
      case "all":
      default:
        return true;
    }
  });

  const totalScore = filteredEvents.reduce(
    (sum, event) => sum + (event.score || 0),
    0
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-100 to-sky-100">
        <div className="text-gray-600 text-lg">Loading...</div>
      </div>
    );
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-100 to-sky-100">
      <div className="py-6 sm:py-12">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <PageHeader />
          {filteredEvents.length > 0 && (
            <TotalScore
              totalScore={totalScore}
              filterType={filterType}
              selectedDate={selectedDate}
            />
          )}
          <FilterControls
            activeFilter={filterType}
            selectedDate={selectedDate}
            onFilterChange={handleFilterChange}
            onOpenCalendar={() => setIsCalendarOpen(true)}
          />
          <EventList
            events={filteredEvents}
            onDeleteEvent={handleDeleteEvent}
          />
        </main>
      </div>
      <AddEventButton onClick={openModal} />
      <AddEventModal
        isOpen={isModalOpen || isTextError}
        onClose={closeModal}
        onAddEvent={handleAddEvent}
        isTextError={isTextError}
      />
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
}
