"use client";

import { useState } from "react";

type Props = {
  onStart: (data: { title: string; genre: string; characters: string[] }) => Promise<void> | void;
};

export default function StoryInput({ onStart }: Props) {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [charactersText, setCharactersText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!title.trim() || !genre.trim()) return;
    setIsSubmitting(true);
    const characters = charactersText.split(/\n|,/).map(s => s.trim()).filter(Boolean);
    try {
      await onStart({ title: title.trim(), genre: genre.trim(), characters });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-[70vh] flex items-center justify-center px-4">
      {/* --- Glassmorphic Background Container --- */}
      <form
        onSubmit={submit}
        className="relative z-10 max-w-3xl w-full bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-8 shadow-2xl"
      >
        <div className="space-y-6">
          <label className="block">
            <span className="text-sm text-gray-300">Story Title</span>
            <input
              className="mt-2 w-full bg-gray-800/50 border border-gray-700/50 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="The Hollow City"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-300">Genre</span>
            <input
              className="mt-2 w-full bg-gray-800/50 border border-gray-700/50 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Noir / Gothic"
            />
          </label>
          <label className="block">
            <span className="text-sm text-gray-300">Characters (one per line or comma separated)</span>
            <textarea
              className="mt-2 w-full bg-gray-800/50 border border-gray-700/50 px-4 py-3 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={charactersText}
              onChange={(e) => setCharactersText(e.target.value)}
              rows={4}
              placeholder={"Aria - detective\nCorvus - enigmatic stranger"}
            />
          </label>

          <div className="pt-4 flex justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-72 px-12 py-4 text-xl bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl text-white transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              {isSubmitting ? "Starting..." : "Start Story"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
