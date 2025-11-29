export default function Choices({ choices, onSelect }: any) {
  if (!choices || choices.length === 0) return null;

  return (
    <div className="flex flex-col gap-3">
      {choices.map((c: string, i: number) => (
        <button
          key={i}
          onClick={() => onSelect(c)}
          className="px-4 py-3 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-600"
        >
          {c}
        </button>
      ))}
    </div>
  );
}
