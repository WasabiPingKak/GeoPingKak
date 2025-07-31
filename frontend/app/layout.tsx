// app/layout.tsx

import "./globals.css";
import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import QueryProvider from "@/components/QueryProvider";

export const metadata = {
  title: "GeoPingKak",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <QueryProvider>
          <div className="flex min-h-screen bg-zinc-900 text-white">
            <Sidebar />
            <main className="flex-1 p-6 overflow-y-auto">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
