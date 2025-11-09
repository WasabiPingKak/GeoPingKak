// app/daily-challenge/page.tsx（server component，預設無 "use client"）

import { generateMetadata } from "./metadata";
import ClientPage from "./client";

export { generateMetadata };

export default function Page() {
  return <ClientPage />;
}
