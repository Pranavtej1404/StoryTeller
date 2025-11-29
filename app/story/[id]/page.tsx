// app/story/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function StoryPage({ params }: { params: { id: string } }) {
  const storyId = params.id;
  const router = useRouter();

  const [story, setStory] = useState<any>(null);
  const [scenes, setScenes] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    async function loadStory() {
      const res = await fetch(`/api/story/${storyId}`);
      const data = await res.json();

      setStory(data.story);
      setScenes(data.scenes);
    }

    loadStory();
  }, [storyId]);

  if (!story) return <p className="p-6 text-gray-300">Loading story...</p>;

  return (
    <div className="min-h-screen p-6 text-gray-100 bg-[#0a0a0c]">

      {/* --- Header with History Icon --- */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{story.title}</h1>

        <button
          onClick={() => setShowHistory(true)}
          className="text-lg px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
        >
          🕘 History
        </button>
      </div>

      {/* --- Show latest scene --- */}
      <div className="bg-gray-900 p-5 rounded-xl shadow-lg">
        <p className="whitespace-pre-line text-lg leading-relaxed">
          {scenes[scenes.length - 1]?.content}
        </p>
      </div>

      {/* --- Choices --- */}
      {scenes[scenes.length - 1]?.choices?.length > 0 && (
        <div className="mt-4 space-y-3">
          {scenes[scenes.length - 1].choices.map((c: string, idx: number) => (
            <button
              key={idx}
              onClick={() => router.push(`/play/${storyId}?choice=${idx}`)}
              className="w-full p-3 bg-blue-700 rounded-lg hover:bg-blue-600"
            >
              {c}
            </button>
          ))}
        </div>
      )}

      {/* --- History Modal --- */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center">
          <div className="bg-gray-900 p-6 rounded-xl w-[90%] max-w-lg">
            <h2 className="text-2xl mb-4 font-semibold">Story History</h2>

            <div className="max-h-96 overflow-y-auto space-y-3">
              {scenes.map((scene, idx) => (
                <button
                  key={scene.id}
                  onClick={() => {
                    setShowHistory(false);
                    const el = document.getElementById(`scene-${scene.id}`);
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-left p-3 bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  <p className="font-semibold">Scene {idx + 1}</p>
                  <p className="text-sm line-clamp-2">{scene.content}</p>
                </button>
              ))}
            </div>

            <button
              className="mt-4 w-full bg-red-700 py-2 rounded-lg"
              onClick={() => setShowHistory(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* --- Invisible anchors for scene jumping --- */}
      <div className="hidden">
        {scenes.map((s) => (
          <div key={s.id} id={`scene-${s.id}`}></div>
        ))}
      </div>
    </div>
  );
}
