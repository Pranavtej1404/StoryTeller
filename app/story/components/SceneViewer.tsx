export default function SceneViewer({ scene }: { scene: string | null }) {
  if (!scene) return null;

  return (
    <div className="p-6 bg-gray-900/60 rounded-xl border border-gray-700 space-y-4">
      {scene.split("\n\n").map((p, i) => (
        <p key={i} className="text-gray-200 leading-relaxed">
          {p}
        </p>
      ))}
    </div>
  );
}
