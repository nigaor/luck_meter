"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css"; // デフォルトのスタイルをインポート

// カレンダーの日本語化などの設定
import { ja } from 'date-fns/locale';

interface CalendarProps {
  selectedDate: Date | undefined;
  onDateChange: (date: Date | undefined) => void;
}

export default function Calendar({ selectedDate, onDateChange }: CalendarProps) {
  return (
    <div className="flex justify-center p-4 bg-white rounded-xl shadow-lg">
      <DayPicker
        mode="single"
        selected={selectedDate}
        onSelect={(date) => {
          console.log("1. Calendar.tsx: 日付が選択されました", date); // ログを追加
          onDateChange(date); // 親に通知
        }}
        locale={ja} // 表示を日本語に
        showOutsideDays // 当月以外の日にちも表示
        fixedWeeks // 週の数を6週に固定
        classNames={{ // Tailwind CSSで見た目を微調整
          caption: "flex justify-center items-center relative mb-4",
          caption_label: "text-lg font-bold",
          nav_button: "h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100",
          head_row: "flex",
          head_cell: "w-10 h-10 flex items-center justify-center text-sm font-semibold text-gray-500",
          row: "flex w-full mt-2",
          cell: "w-10 h-10 flex items-center justify-center",
          day: "h-9 w-9 rounded-full hover:bg-blue-100 transition-colors",
          day_selected: "bg-indigo-600 text-white hover:bg-indigo-600",
          day_today: "font-bold text-indigo-600",
          day_outside: "text-gray-400 opacity-50",
        }}
      />
    </div>
  );
}