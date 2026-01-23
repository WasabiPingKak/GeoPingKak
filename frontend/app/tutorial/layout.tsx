import TutorialLayoutShell from "@/components/tutorial/TutorialLayoutShell";

export default function TutorialLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8">
      <TutorialLayoutShell>
        {children}
      </TutorialLayoutShell>
    </div>
  );
}
