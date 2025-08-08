import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import type { PlateInfo } from "./plateData";


type PlateBlockProps = {
  title: string;
  data: PlateInfo[];
};

export default function PlateBlock({ title, data }: PlateBlockProps) {
  return (
    <div className="text-muted-foreground text-sm leading-relaxed">
      <h3 className="text-lg font-semibold text-white mb-3">{title}</h3>
      <section className="space-y-6">
        {data.map(({ country, image, description }) => (
          <div
            key={country}
            className="flex flex-col md:flex-row md:items-center gap-4 border border-zinc-700 rounded-lg p-4"
          >
            <div className="md:w-1/3 flex justify-center">
              <Zoom>
                <img
                  src={image}
                  alt={`${country}車牌`}
                  className="rounded-lg border border-zinc-700 shadow-md max-w-full"
                />
              </Zoom>
            </div>
            <div className="md:w-2/3 space-y-1">
              <p className="font-semibold text-xl text-white">{country}</p>
              {description.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
