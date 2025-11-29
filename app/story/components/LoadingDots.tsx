export default function LoadingDots() {
  return (
    <div className="flex gap-2 justify-center">
      <div className="w-3 h-3 bg-white rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-150"></div>
      <div className="w-3 h-3 bg-white rounded-full animate-bounce delay-300"></div>
    </div>
  );
}
