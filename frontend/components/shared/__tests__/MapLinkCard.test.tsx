import { render, screen } from "@testing-library/react";
import MapLinkCard from "../MapLinkCard";

describe("MapLinkCard", () => {
  it("renders label and description", () => {
    render(
      <MapLinkCard label="測試地圖" url="https://example.com" description="地圖說明" />
    );
    expect(screen.getByText("測試地圖")).toBeInTheDocument();
    expect(screen.getByText("地圖說明")).toBeInTheDocument();
  });

  it("links to the correct URL with target=_blank", () => {
    render(
      <MapLinkCard label="測試地圖" url="https://example.com/map" description="說明" />
    );
    const link = screen.getByRole("link", { name: /測試地圖/ });
    expect(link).toHaveAttribute("href", "https://example.com/map");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders difficulty badge when provided", () => {
    render(
      <MapLinkCard
        label="難地圖"
        url="https://example.com"
        description="說明"
        difficulty="🔴"
      />
    );
    expect(screen.getByText("🔴")).toBeInTheDocument();
  });

  it("does not render difficulty badge when not provided", () => {
    const { container } = render(
      <MapLinkCard label="地圖" url="https://example.com" description="說明" />
    );
    // No span with mr-1 (difficulty wrapper)
    const difficultySpan = container.querySelector("span.mr-1");
    expect(difficultySpan).toBeNull();
  });
});
