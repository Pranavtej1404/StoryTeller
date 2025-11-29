"use client";

import { useState } from "react";

export default function useStory() {
  const [storyTitle, setStoryTitle] = useState<string | null>(null);
  const [currentScene, setCurrentScene] = useState<string | null>(null);
  const [choices, setChoices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [storyId, setStoryId] = useState<string | null>(null);

  // Start a new story
  const startNewStory = async (
    title: string,
    genre: string,
    characters: string[]
  ) => {
    setIsLoading(true);

    // Create story
    const res = await fetch("/api/story/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, genre, characters }),
    });

    const data = await res.json();
    setStoryId(data.storyId);
    setStoryTitle(title);

    // Generate FIRST scene
    const sceneRes = await fetch("/api/generate/scene", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storyId: data.storyId,
        title,
        genre,
        characters,
        previousScene: null,
      }),
    });

    const sceneData = await sceneRes.json();
    setCurrentScene(sceneData.scene);
    setChoices(sceneData.choices || []);
    setIsLoading(false);
  };

  // Continue story
  const generateNextScene = async (choice: string) => {
    if (!storyId || !currentScene) return;

    setIsLoading(true);

    const res = await fetch("/api/generate/scene", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storyId,
        choice,
        previousScene: currentScene,
      }),
    });

    const data = await res.json();

    setCurrentScene(data.scene);
    setChoices(data.choices || []);
    setIsLoading(false);
  };

  return {
    story: storyTitle ? { id: storyId, title: storyTitle } : null,
    storyId,
    currentScene,
    choices,
    isLoading,
    startNewStory,
    generateNextScene,
  };
}
