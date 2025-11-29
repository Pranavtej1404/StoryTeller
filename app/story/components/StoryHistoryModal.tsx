"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

type Story = {
  id: string;
  title: string;
  genre: string;
};

export default function StoryHistoryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [stories, setStories] = useState<Story[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;

    const loadStories = async () => {
      const res = await fetch("/api/story/list");
      const data = await res.json();
      setStories(data.stories || []);
    };

    loadStories();
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 w-full max-w-xl shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Story History</h2>
          <button onClick={onClose}>
            <X className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Stories List */}
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
          {stories.length === 0 && (
            <p className="text-gray-500 text-sm">No saved stories found.</p>
          )}

          {stories.map((s) => (
            <button
              key={s.id}
              onClick={() => router.push(`/story/${s.id}`)}
              className="w-full text-left p-4 bg-gray-800/40 hover:bg-gray-700/40 border border-gray-700 rounded-xl transition"
            >
              <div className="text-white font-medium">{s.title}</div>
              <div className="text-gray-400 text-sm">{s.genre}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
