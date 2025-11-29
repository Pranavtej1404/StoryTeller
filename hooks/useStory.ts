"use client";

import { useState } from "react";

export default function useStory() {
  const [storyTitle, setStoryTitle] = useState<string | null>(null);
  const [currentScene, setCurrentScene] = useState<string | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [storyId, setStoryId] = useState<string | null>(null);
  const startNewStory = async (title: string, genre: string, characters: string[]) => {
  setIsLoading(true);

  const res = await fetch("/api/story/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, genre, characters }),
  });

  const data = await res.json();
  setStoryId(data.storyId);

  // Generate first scene
  const sceneRes = await fetch("/api/generate/scene", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ storyId: data.storyId, prompt: title }),
  });

  const sceneData = await sceneRes.json();
  setCurrentScene(sceneData.scene);
  setChoices(sceneData.choices || []);
  setIsLoading(false);
};


  const generateNextScene = async (choice: string) => {
  if (!storyId) return;
  if (!currentScene) return;

  setIsLoading(true);

  const res = await fetch("/api/generate/scene", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      storyId,
      previousScene: currentScene,
      choice,
    }),
  });

  const data = await res.json();

  setCurrentScene(data.scene);
  setChoices(data.choices || []);
  setIsLoading(false);
};


  return {
    story: storyTitle ? { title: storyTitle } : null,
    currentScene,
    choices,
    isLoading,
    startNewStory,
    generateNextScene,
  };
}
