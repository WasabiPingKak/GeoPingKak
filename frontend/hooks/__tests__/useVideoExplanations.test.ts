import { renderHook, waitFor } from "@testing-library/react";
import { useVideoExplanations } from "../useVideoExplanations";
import { createWrapper } from "./test-utils";

const mockData = {
  "2026-03-01": {
    "tw-urban": {
      livestream: "https://youtube.com/watch?v=abc",
      explanation: "https://youtube.com/watch?v=def",
    },
  },
};

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useVideoExplanations", () => {
  it("fetches from /api/video-explanations", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
    vi.stubGlobal("fetch", mockFetch);

    const { result } = renderHook(() => useVideoExplanations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith("/api/video-explanations");
    expect(result.current.data).toEqual(mockData);
  });

  it("throws on non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    const { result } = renderHook(() => useVideoExplanations(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe(
      "Failed to fetch video explanations"
    );
  });
});
