"use client";

import { useState } from "react";
import { History } from "lucide-react";
import StoryHistoryModal from "./StoryHistoryModal";

export default function StoryHeader() {
  const [openHistory, setOpenHistory] = useState(false);

  return (
    <>
      {/* HEADER */}
      <header className="w-full py-6 px-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white tracking-wide">
          Story Teller
        </h1>

        {/* History Button */}
        <button
          onClick={() => setOpenHistory(true)}
          className="text-gray-300 hover:text-white transition flex items-center gap-2 px-4 py-2 bg-gray-800/40 border border-gray-700 rounded-xl hover:bg-gray-700 hover:border-gray-500 hover:shadow-lg"
        >
          <History size={20} />
          <span>History</span>
        </button>

      </header>

      {/* Modal */}
      <StoryHistoryModal open={openHistory} onClose={() => setOpenHistory(false)} />
    </>
  );
}
