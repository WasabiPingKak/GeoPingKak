interface ErrorRetryProps {
  message?: string;
  onRetry: () => void;
}

export default function ErrorRetry({
  message = "資料載入失敗，請稍後再試。",
  onRetry,
}: ErrorRetryProps) {
  return (
    <div className="mt-4 p-4 bg-red-900/30 border border-red-800 rounded-lg flex items-center justify-between">
      <p className="text-red-400 text-sm">{message}</p>
      <button
        onClick={onRetry}
        className="ml-4 px-3 py-1.5 text-sm bg-red-800 hover:bg-red-700 text-white rounded transition-colors flex-shrink-0"
      >
        重試
      </button>
    </div>
  );
}
