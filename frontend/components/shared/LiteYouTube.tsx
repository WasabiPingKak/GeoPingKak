"use client";

import { forwardRef, useImperativeHandle, useRef, useState } from "react";

export interface LiteYouTubeHandle {
  /** 載入播放器並從指定秒數開始播放 */
  playFrom: (seconds: number) => void;
}

interface LiteYouTubeProps {
  videoId: string;
  title: string;
}

/**
 * 先顯示縮圖，點擊後才載入 YouTube iframe，避免首次載入就下載播放器的 JS。
 * 不用 youtube-nocookie.com：該網域帶不到 YouTube 登入狀態，會卡在「確認你不是機器人」。
 */
const LiteYouTube = forwardRef<LiteYouTubeHandle, LiteYouTubeProps>(
  function LiteYouTube({ videoId, title }, ref) {
    const [start, setStart] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => ({
      playFrom: (seconds: number) => {
        setStart(seconds);
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      },
    }));

    return (
      <div
        ref={containerRef}
        className="relative w-full aspect-video rounded-md overflow-hidden bg-black"
      >
        {start === null ? (
          <button
            type="button"
            onClick={() => setStart(0)}
            aria-label={`播放影片：${title}`}
            className="group absolute inset-0 w-full h-full"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span
                className={
                  "flex items-center justify-center w-16 h-11 rounded-xl bg-red-600 "
                  + "group-hover:bg-red-500 transition-colors"
                }
              >
                <span className="ml-1 border-y-[10px] border-y-transparent border-l-[16px] border-l-white" />
              </span>
            </span>
          </button>
        ) : (
          <iframe
            // 每次換起點都重建 iframe，才會從新的秒數開始播
            key={start}
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&start=${start}`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}
      </div>
    );
  }
);

export default LiteYouTube;
