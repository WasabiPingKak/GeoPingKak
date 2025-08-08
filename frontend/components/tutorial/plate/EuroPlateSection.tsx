// components/tutorial/plate/EuroPlateSection.tsx

import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export type EuroPlateInfo = {
  title: string;
  images: { src: string; alt: string }[];
  descriptions: string[];
};

export default function EuroPlateSection({ data }: { data: EuroPlateInfo }) {
  return (
    <>
      <h4 className="text-lg font-semibold text-white mb-3">{data.title}</h4>
      <div className="border border-zinc-700 rounded-lg p-4 mb-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* 左側圖片區塊 */}
          <div className="md:w-1/3 flex flex-col gap-2 items-center">
            {data.images.map((img, idx) => (
              <Zoom key={idx}>
                <img
                  src={img.src}
                  alt={img.alt}
                  className="rounded-lg border border-zinc-700 shadow-md w-full"
                />
              </Zoom>
            ))}
          </div>

          {/* 右側說明文字 */}
          <div className="md:w-2/3 space-y-1">
            {data.descriptions.map((desc, idx) => (
              <p key={idx}>{desc}</p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
