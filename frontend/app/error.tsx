"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-white px-4">
      <h2 className="text-xl font-bold mb-2">頁面發生錯誤</h2>
      <p className="text-zinc-400 mb-4">很抱歉，請重新整理或回到首頁</p>
      <button
        onClick={reset}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white transition"
      >
        重試
      </button>
    </div>
  );
}
