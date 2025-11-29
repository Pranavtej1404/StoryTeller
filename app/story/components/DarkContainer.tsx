export default function DarkContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen text-gray-100">
      <div className="container mx-auto px-6 py-8">
        {children}
      </div>
    </div>
  );
}
