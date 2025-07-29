import React from "react";
import {
  FaYoutube,
  FaTwitter,
  FaDiscord,
  FaEnvelope,
} from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="flex justify-center md:justify-start gap-6 pt-2">
      <a
        href="https://www.youtube.com/@PingKak山葵冰角"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="YouTube"
        className="text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-2xl"
      >
        <FaYoutube />
      </a>
      <a
        href="https://twitter.com/wasabi_pingkak"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Twitter"
        className="text-zinc-400 hover:text-sky-600 dark:hover:text-sky-400 transition-colors text-2xl"
      >
        <FaTwitter />
      </a>
      <a
        href="https://discord.gg/ABpdGBbDe4"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Discord"
        className="text-zinc-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors text-2xl"
      >
        <FaDiscord />
      </a>
      <a
        href="mailto:wasabi.pingkak@gmail.com"
        aria-label="Gmail"
        className="text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors text-2xl"
      >
        <FaEnvelope />
      </a>
    </div>
  );
}
