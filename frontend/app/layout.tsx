import "./globals.css";
import type { ReactNode } from "react";
import QueryProvider from "@/components/QueryProvider";
import RootShell from "@/components/layout/RootShell";

export const metadata = {
  title: "GeoPingKak",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-Hant">
      <body>
        <QueryProvider>
          <RootShell>{children}</RootShell>
        </QueryProvider>
      </body>
    </html>
  );
}
