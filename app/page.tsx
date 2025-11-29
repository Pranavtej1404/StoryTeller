import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center text-center px-6">
      <div className="fade-in space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
          Dynamic Storytelling AI
        </h1>

        <p className="text-gray-400 max-w-xl mx-auto">
          Create evolving, character-consistent stories powered by AI.
        </p>

        <Link
          href="/story"
          className="
            inline-block px-10 py-4 rounded-xl 
            bg-indigo-600 hover:bg-indigo-500 
            text-lg font-semibold shadow-lg hover:scale-105
            transition-all
          "
        >
          Start Story
        </Link>
      </div>
    </main>
  );
}
