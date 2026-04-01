import { render } from "@testing-library/react";
import LoadingSkeleton from "../LoadingSkeleton";

describe("LoadingSkeleton", () => {
  it("renders 3 skeleton rows by default", () => {
    const { container } = render(<LoadingSkeleton />);
    const rows = container.querySelectorAll(".bg-zinc-800");
    expect(rows).toHaveLength(3);
  });

  it("renders custom number of rows", () => {
    const { container } = render(<LoadingSkeleton rows={5} />);
    const rows = container.querySelectorAll(".bg-zinc-800");
    expect(rows).toHaveLength(5);
  });

  it("has pulse animation class", () => {
    const { container } = render(<LoadingSkeleton />);
    expect(container.firstElementChild?.className).toContain("animate-pulse");
  });
});
