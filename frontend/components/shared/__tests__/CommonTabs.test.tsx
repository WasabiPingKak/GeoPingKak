import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommonTabs from "../CommonTabs";

const options = ["全部", "台灣", "日本"];

describe("CommonTabs", () => {
  it("renders all options as buttons", () => {
    render(<CommonTabs options={options} selected="全部" onSelect={() => {}} />);
    for (const option of options) {
      expect(screen.getByRole("button", { name: option })).toBeInTheDocument();
    }
  });

  it("selected option has active styling", () => {
    render(<CommonTabs options={options} selected="台灣" onSelect={() => {}} />);
    const selected = screen.getByRole("button", { name: "台灣" });
    expect(selected.className).toContain("bg-blue-600");
  });

  it("non-selected options do not have active styling", () => {
    render(<CommonTabs options={options} selected="台灣" onSelect={() => {}} />);
    const other = screen.getByRole("button", { name: "全部" });
    expect(other.className).not.toContain("bg-blue-600");
  });

  it("calls onSelect with the clicked option value", async () => {
    const onSelect = vi.fn();
    render(<CommonTabs options={options} selected="全部" onSelect={onSelect} />);

    await userEvent.click(screen.getByRole("button", { name: "日本" }));
    expect(onSelect).toHaveBeenCalledWith("日本");
  });

  it("renders correctly with a single option", () => {
    render(<CommonTabs options={["唯一"]} selected="唯一" onSelect={() => {}} />);
    expect(screen.getByRole("button", { name: "唯一" })).toBeInTheDocument();
  });
});
