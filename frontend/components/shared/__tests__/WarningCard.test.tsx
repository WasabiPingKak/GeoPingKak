import { render, screen } from "@testing-library/react";
import WarningCard from "../WarningCard";

describe("WarningCard", () => {
  it("renders the warning heading", () => {
    render(<WarningCard />);
    expect(screen.getByText("其他注意事項：")).toBeInTheDocument();
  });

  it("warns about personal information exposure", () => {
    render(<WarningCard />);
    expect(screen.getByText(/暴露個人資訊/)).toBeInTheDocument();
  });
});
