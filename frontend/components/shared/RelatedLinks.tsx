import Link from "next/link";

interface RelatedLink {
  href: string;
  title: string;
  description: string;
}

export default function RelatedLinks({ links }: { links: RelatedLink[] }) {
  return (
    <nav aria-label="相關內容" className="mt-12 pt-8 border-t border-zinc-700">
      <h2 className="text-lg font-bold mb-4 text-zinc-300">相關內容</h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block p-4 rounded-lg border border-zinc-700 bg-zinc-800/50 hover:border-blue-500 hover:bg-zinc-800 transition-colors"
          >
            <span className="font-semibold text-blue-400">{link.title}</span>
            <p className="text-sm text-zinc-400 mt-1">{link.description}</p>
          </Link>
        ))}
      </div>
    </nav>
  );
}
