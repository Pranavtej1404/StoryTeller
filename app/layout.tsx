import "./globals.css";

export const metadata = {
  title: "Dynamic Storytelling AI",
  description: "Create evolving stories powered by AI"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#060608] text-gray-100 min-h-screen antialiased">
        {/* Cyberpunk Glow Grid */}
<div className="absolute inset-0 -z-10 bg-black">
  <div
    className="absolute inset-0 opacity-20"
    style={{
      backgroundImage:
        "linear-gradient(#202020 1px, transparent 1px), linear-gradient(90deg, #202020 1px, transparent 1px)",
      backgroundSize: "40px 40px",
    }}
  />

  <div className="absolute top-20 left-12 w-72 h-72 bg-fuchsia-600/40 blur-[120px] rounded-full" />
  <div className="absolute bottom-12 right-20 w-96 h-96 bg-cyan-500/40 blur-[140px] rounded-full" />
</div>





        {children}
      </body>
    </html>
  );
}
