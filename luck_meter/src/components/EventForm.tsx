"use client";

import { useState, FormEvent } from 'react';

interface EventFormProps {
  onAddEvent: (eventText: string, category?: string) => void; // categoryも渡せるように変更
}

export default function EventForm({ onAddEvent }: EventFormProps) {
  const [eventText, setEventText] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!eventText.trim()) return;
    onAddEvent(eventText, category.trim() || undefined); // categoryが空ならundefined
    setEventText('');
    setCategory('');
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
          placeholder="例: 新しいカフェで美味しいコーヒーを飲んだ"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          カテゴリ (任意):
        </label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="例: 仕事, 趣味, 学び"
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out sm:text-sm"
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