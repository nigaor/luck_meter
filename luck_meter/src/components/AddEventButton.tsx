interface AddEventButtonProps {
  onClick: () => void;
}

export default function AddEventButton({ onClick }: AddEventButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed top-180 right-10 z-10 flex h-40 w-60 items-center justify-center rounded-2xl bg-indigo-600 text-white text-3xl shadow-lg transition-all duration-100 hover:bg-indigo-700 hover:scale-110 cursor-pointer"
    >
      ⊕出来事を追加
    </button>
  );
}