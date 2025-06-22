"use client";

import Calendar from "./Calendar";

interface CalendarModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
}

export default function CalendarModal({
  isOpen,
  onClose,
  selectedDate,
  onDateSelect,
}: CalendarModalProps) {
  // isOpenがfalseなら、何もレンダリングしない
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        <Calendar selectedDate={selectedDate} onDateChange={onDateSelect} />
      </div>
    </div>
  );
}