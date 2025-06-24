"use client";

import { format } from "date-fns";

// フィルターの種類を定義
export type FilterType = "all" | "today" | "thisMonth" | "thisYear" | "date";

interface FilterControlsProps {
  activeFilter: FilterType;
  selectedDate: Date | undefined
  onFilterChange: (filter: FilterType) => void;
  onOpenCalendar: () => void;
}

export default function FilterControls({
  activeFilter,
  selectedDate,
  onFilterChange,
  onOpenCalendar,
}: FilterControlsProps) {
  // ボタンのスタイルを動的に変更するための関数
  const getButtonClass = (filter: FilterType) => {
    return activeFilter === filter
      ? "bg-indigo-600 text-white"
      : "bg-white text-gray-700 hover:bg-gray-50";
  };

  return (
    <div className="my-10 p-4 bg-white rounded-xl shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <button onClick={() => onFilterChange("all")} className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-100 hover:scale-120 cursor-pointer ${getButtonClass("all")}`}>
            すべて
          </button>
          <button onClick={() => onFilterChange("today")} className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-100 hover:scale-120 cursor-pointer ${getButtonClass("today")}`}>
            今日
          </button>
          <button onClick={() => onFilterChange("thisMonth")} className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-100 hover:scale-120 cursor-pointer ${getButtonClass("thisMonth")}`}>
            今月
          </button>
          <button onClick={() => onFilterChange("thisYear")} className={`px-4 py-2 text-sm font-semibold rounded-lg border transition-all duration-100 hover:scale-120 cursor-pointer ${getButtonClass("thisYear")}`}>
            今年
          </button>
        </div>
        <button
          onClick={onOpenCalendar}
          className={`px-4 py-2 text-sm font-semibold rounded-lg border duration-100 hover:scale-120 transition-all cursor-pointer ${getButtonClass("date")}`}
        >
          {selectedDate && activeFilter === 'date'
            ? format(selectedDate, "yyyy/M/d")
            : "日付で選択"}
        </button>
      </div>
    </div>
  );
}