interface AddEventButtonProps {
  onClick: () => void;
}

export default function AddEventButton({ onClick }: AddEventButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-25 right-5 z-10 flex h-25 w-45 items-center justify-center rounded-2xl bg-indigo-600 text-white text-2xl shadow-lg transition-all duration-100 hover:bg-indigo-700 hover:scale-110 cursor-pointer"
    >
      出来事を追加
    </button>
  );
}
