"use client";

interface ImageLoaderParams {
  src: string;
  width: number;
  quality?: number;
}

export default function imageLoader({ src }: ImageLoaderParams): string {
  return src;
}
