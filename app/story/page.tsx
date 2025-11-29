"use client";

import DarkContainer from "./components/DarkContainer";
import StoryHeader from "./components/StoryHeader";
import StoryInput from "./components/StoryInput";
import SceneViewer from "./components/SceneViewer";
import Choices from "./components/Choices";
import LoadingDots from "./components/LoadingDots";
import useStory from "@/hooks/useStory";
import { useState } from "react";

export default function StoryPage() {
  const { currentScene, choices, isLoading, startNewStory, generateNextScene } =
    useStory();

  const [isStarted, setIsStarted] = useState(false);

  const handleStart = async (data: { title: string; genre: string; characters: string[] }) => {
    setIsStarted(true);
    await startNewStory(data.title, data.genre, data.characters);
  };

  return (
    <DarkContainer>
      <StoryHeader />

      <div className="max-w-5xl mx-auto px-6 py-10">
        {!isStarted && (
          <div className="fixed inset-0 flex items-center justify-center fade-in">
            <StoryInput onStart={handleStart} />
          </div>
        )}

        {isStarted && (
          <div className="fade-in space-y-6">
            <SceneViewer scene={currentScene} />

            {isLoading ? (
              <LoadingDots />
            ) : (
              <Choices choices={choices} onSelect={generateNextScene} />
            )}
          </div>
        )}
      </div>
    </DarkContainer>
  );
}
