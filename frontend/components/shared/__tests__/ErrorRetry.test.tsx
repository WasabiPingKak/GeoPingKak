import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ErrorRetry from "../ErrorRetry";

describe("ErrorRetry", () => {
  it("renders default message when no message prop", () => {
    render(<ErrorRetry onRetry={() => {}} />);
    expect(screen.getByText("資料載入失敗，請稍後再試。")).toBeInTheDocument();
  });

  it("renders custom message", () => {
    render(<ErrorRetry message="自訂錯誤" onRetry={() => {}} />);
    expect(screen.getByText("自訂錯誤")).toBeInTheDocument();
  });

  it("renders a retry button", () => {
    render(<ErrorRetry onRetry={() => {}} />);
    expect(screen.getByRole("button", { name: "重試" })).toBeInTheDocument();
  });

  it("calls onRetry when retry button is clicked", async () => {
    const onRetry = vi.fn();
    render(<ErrorRetry onRetry={onRetry} />);

    await userEvent.click(screen.getByRole("button", { name: "重試" }));
    expect(onRetry).toHaveBeenCalledOnce();
  });
});
