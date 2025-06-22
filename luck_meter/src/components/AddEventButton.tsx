interface AddEventButtonProps {
  onClick: () => void;
}

export default function AddEventButton({ onClick }: AddEventButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-16 right-16 z-40 flex h-16 w-32 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg transition-all duration-300 hover:bg-indigo-700 hover:scale-120"
    >
      ＋出来事を追加
    </button>
  );
}