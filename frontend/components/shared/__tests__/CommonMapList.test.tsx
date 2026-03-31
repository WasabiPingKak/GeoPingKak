import { render, screen } from "@testing-library/react";
import CommonMapList from "../CommonMapList";
import type { DailyChallengeEntry } from "@/types/map-entry";
import type { MapMetadata } from "@/components/daily-challenge/mapTitles";

// Mock CommonMapCard to isolate CommonMapList logic
vi.mock("../CommonMapCard", () => ({
  default: ({ displayMapId }: { displayMapId: string }) => (
    <div data-testid={`map-card-${displayMapId}`}>{displayMapId}</div>
  ),
}));

const metadataMap: Record<string, MapMetadata> = {
  "world-figsy": {
    title: "A Figsy World",
    description: "test",
    source: "abc",
  },
  "tw-urban": {
    title: "繁榮的台灣",
    description: "test",
    source: "def",
  },
};

describe("CommonMapList", () => {
  it("groups entries with replaced mapId under the replacement", () => {
    const entries: DailyChallengeEntry[] = [
      { country: "世界", mapId: "world-acw", challengeUrl: "url1", createdAt: "2026-03-01" },
      { country: "世界", mapId: "world-figsy", challengeUrl: "url2", createdAt: "2026-03-02" },
    ];

    render(<CommonMapList entries={entries} metadataMap={metadataMap} />);

    // Both should be grouped under world-figsy (world-acw is replaced)
    expect(screen.getByTestId("map-card-world-figsy")).toBeInTheDocument();
    // Should NOT have a separate card for world-acw
    expect(screen.queryByTestId("map-card-world-acw")).not.toBeInTheDocument();
  });

  it("filters out entries whose mapId has no metadata", () => {
    const entries: DailyChallengeEntry[] = [
      { country: "世界", mapId: "unknown-map", challengeUrl: "url1", createdAt: "2026-03-01" },
      { country: "台灣", mapId: "tw-urban", challengeUrl: "url2", createdAt: "2026-03-02" },
    ];

    render(<CommonMapList entries={entries} metadataMap={metadataMap} />);

    expect(screen.getByTestId("map-card-tw-urban")).toBeInTheDocument();
    expect(screen.queryByTestId("map-card-unknown-map")).not.toBeInTheDocument();
  });

  it("renders cards in metadataMap key order", () => {
    const entries: DailyChallengeEntry[] = [
      { country: "台灣", mapId: "tw-urban", challengeUrl: "url1", createdAt: "2026-03-01" },
      { country: "世界", mapId: "world-figsy", challengeUrl: "url2", createdAt: "2026-03-02" },
    ];

    render(<CommonMapList entries={entries} metadataMap={metadataMap} />);

    const cards = screen.getAllByTestId(/^map-card-/);
    expect(cards[0]).toHaveTextContent("world-figsy");
    expect(cards[1]).toHaveTextContent("tw-urban");
  });

  it("handles empty entries without crashing", () => {
    render(<CommonMapList entries={[]} metadataMap={metadataMap} />);
    // Should not render any cards when no entries and no availableMonths
    expect(screen.queryByTestId(/^map-card-/)).not.toBeInTheDocument();
  });

  it("shows all metadata maps when availableMonths is provided", () => {
    render(
      <CommonMapList
        entries={[]}
        metadataMap={metadataMap}
        availableMonths={["2026-03"]}
      />
    );

    // In month navigation mode, all maps with metadata should show even without entries
    expect(screen.getByTestId("map-card-world-figsy")).toBeInTheDocument();
    expect(screen.getByTestId("map-card-tw-urban")).toBeInTheDocument();
  });
});
