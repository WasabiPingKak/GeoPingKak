import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommonMapCard from "../CommonMapCard";
import type { DailyChallengeEntry } from "@/types/map-entry";
import type { MapMetadata } from "@/components/daily-challenge/mapTitles";

// Mock useVideoExplanations to avoid needing QueryClient
vi.mock("@/hooks/useVideoExplanations", () => ({
  useVideoExplanations: () => ({ data: undefined }),
}));

const metadata: Record<string, MapMetadata> = {
  "world-figsy": {
    title: "A Figsy World (高難度)",
    description: "由社群精選的高品質地點組成",
    source: "abc123",
  },
};

const entries: DailyChallengeEntry[] = [
  { country: "世界", mapId: "world-figsy", challengeUrl: "https://geo.test/1", createdAt: "2026-03-15" },
  { country: "世界", mapId: "world-figsy", challengeUrl: "https://geo.test/2", createdAt: "2026-03-10" },
  { country: "世界", mapId: "world-figsy", challengeUrl: "https://geo.test/3", createdAt: "2026-02-20" },
];

describe("CommonMapCard", () => {
  it("renders metadata title and description", () => {
    render(
      <CommonMapCard
        displayMapId="world-figsy"
        entries={entries}
        metadataMap={metadata}
      />
    );
    expect(screen.getByText("A Figsy World (高難度)")).toBeInTheDocument();
    expect(screen.getByText("由社群精選的高品質地點組成")).toBeInTheDocument();
  });

  it("renders source link when showSourceLink is true", () => {
    render(
      <CommonMapCard
        displayMapId="world-figsy"
        entries={entries}
        metadataMap={metadata}
        showSourceLink={true}
      />
    );
    const link = screen.getByText("地圖來源");
    expect(link).toHaveAttribute("href", "https://www.geoguessr.com/maps/abc123");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("does not render source link when showSourceLink is false", () => {
    render(
      <CommonMapCard
        displayMapId="world-figsy"
        entries={entries}
        metadataMap={metadata}
        showSourceLink={false}
      />
    );
    expect(screen.queryByText("地圖來源")).not.toBeInTheDocument();
  });

  it("groups entries by month", () => {
    render(
      <CommonMapCard
        displayMapId="world-figsy"
        entries={entries}
        metadataMap={metadata}
      />
    );
    expect(screen.getByText("2026-03")).toBeInTheDocument();
    expect(screen.getByText("2026-02")).toBeInTheDocument();
  });

  it("toggles month expand/collapse on click", async () => {
    render(
      <CommonMapCard
        displayMapId="world-figsy"
        entries={entries}
        metadataMap={metadata}
      />
    );

    // Find a collapsed month and expand it
    const month202602 = screen.getByText("2026-02");
    const toggleButton = month202602.closest("button")!;

    // Click to toggle
    await userEvent.click(toggleButton);

    // The entry date should now be visible
    expect(screen.getByText(/2026-02-20/)).toBeInTheDocument();
  });

  it("sorts entries within a month in descending order", () => {
    render(
      <CommonMapCard
        displayMapId="world-figsy"
        entries={entries}
        metadataMap={metadata}
        expandAll={true}
      />
    );

    const links = screen.getAllByText(/📅 2026-03/);
    expect(links[0]).toHaveTextContent("2026-03-15");
    expect(links[1]).toHaveTextContent("2026-03-10");
  });

  it("calls onToggleMonth in external month navigation mode", async () => {
    const onToggleMonth = vi.fn();

    render(
      <CommonMapCard
        displayMapId="world-figsy"
        entries={entries}
        metadataMap={metadata}
        availableMonths={["2026-03", "2026-02"]}
        expandedMonths={new Set(["2026-03"])}
        loadingMonths={new Set()}
        onToggleMonth={onToggleMonth}
      />
    );

    const month202602 = screen.getByText("2026-02");
    await userEvent.click(month202602.closest("button")!);

    expect(onToggleMonth).toHaveBeenCalledWith("2026-02");
  });

  it("shows loading state for a month", () => {
    render(
      <CommonMapCard
        displayMapId="world-figsy"
        entries={[]}
        metadataMap={metadata}
        availableMonths={["2026-03"]}
        expandedMonths={new Set(["2026-03"])}
        loadingMonths={new Set(["2026-03"])}
        onToggleMonth={() => {}}
      />
    );

    expect(screen.getByText("載入中...")).toBeInTheDocument();
  });

  it("shows replaced map label for old mapIds", () => {
    const entriesWithOldMap: DailyChallengeEntry[] = [
      { country: "世界", mapId: "world-acw", challengeUrl: "https://geo.test/old", createdAt: "2026-03-01" },
    ];

    render(
      <CommonMapCard
        displayMapId="world-figsy"
        entries={entriesWithOldMap}
        metadataMap={metadata}
        expandAll={true}
      />
    );

    expect(screen.getByText("ACW")).toBeInTheDocument();
  });
});
