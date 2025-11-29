"use client";

import { useEffect, useState } from "react";

export default function StoryPage({ params }: { params: { id: string } }) {
  const storyId = params.id;
  const [scenes, setScenes] = useState([{
    id:"",content: "",sequenece:0,choices:[],choice:""
  }]);
  const [loading, setLoading] = useState(false);

  async function load() {
    const res = await fetch(`/api/story/${storyId}`);
    const data = await res.json();
    setScenes(data.scenes || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function generateNext(choice: string) {
    setLoading(true);

    const previousScene = scenes[scenes.length - 1]?.content;

    const res = await fetch("/api/story/scene", {
      method: "POST",
      body: JSON.stringify({ storyId, previousScene, choice }),
    });

    const data = await res.json();
    setScenes((prev) => [...prev, { id: data.id,content: data.scene, choices: data.choices, sequenece:data.seq, choice:data.choice }]);
    setLoading(false);
  }

  return (
    <div className="w-full p-6 max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Your Story</h1>

      {scenes.map((s, i) => (
        <div key={i} className="bg-neutral-900 p-4 rounded-xl border border-neutral-700">
          <p className="whitespace-pre-wrap">{s.content}</p>

          {/* Show choices only for last scene */}
          {i === scenes.length - 1 && s.choices && (
            <div className="mt-3 space-y-2">
              {s.choices.map((c: string, idx: number) => (
                <button
                  key={idx}
                  onClick={() => generateNext(c)}
                  disabled={loading}
                  className="w-full bg-neutral-800 hover:bg-neutral-700 rounded-lg px-4 py-2 text-left border border-neutral-600"
                >
                  {c}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {loading && <p>Generating next scene...</p>}
    </div>
  );
}
