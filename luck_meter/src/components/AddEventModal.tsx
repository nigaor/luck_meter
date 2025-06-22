import EventForm from "./EventForm";

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (eventText: string) => Promise<void>;
  isTextError: boolean;
}

export default function AddEventModal({ isOpen, onClose, onAddEvent, isTextError}: AddEventModalProps) {
  if (!isOpen) {
    return null;
  }

  const handleFormSubmit = async (eventText: string) => {
    await onAddEvent(eventText);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white p-8 rounded-2xl shadow-xl z-10 max-w-lg w-full m-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="閉じる"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">新しい出来事を記録</h2>
        {isTextError && (
          <div className="mb-4 text-red-600 text-center">
            文章が不適切のため正しくスコアを生成できませんでした。<br/>
            別の文章を再度入力してください。
          </div>
        )}
        <EventForm
          onAddEvent={handleFormSubmit}
        />
      </div>
    </div>
  );
}