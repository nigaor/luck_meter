"use client";

import { useState, FormEvent } from 'react';

interface EventFormProps {
  onAddEvent: (eventText: string) => void;
}

export default function EventForm({ onAddEvent }: EventFormProps) {
  const [eventText, setEventText] = useState('');

  // フォーム送信時のハンドラー
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!eventText.trim()) return;
    onAddEvent(eventText); 
    setEventText('');
  };
  // Enterキーでの送信を防ぐためのハンドラー
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-xl shadow-lg space-y-6">
      <div>
        <label htmlFor="eventText" className="block text-sm font-medium text-gray-700 mb-1">
          今日の出来事:
        </label>
        <textarea
          id="eventText"
          value={eventText}
          onChange={(e) => setEventText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="例: 新しいカフェで美味しいコーヒーを飲んだ"
          rows={2}
          maxLength={50}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm  resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm}"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
      >
        出来事を追加して点数化
      </button>
    </form>
  );
}