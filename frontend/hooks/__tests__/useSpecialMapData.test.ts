import { renderHook, waitFor } from "@testing-library/react";
import { useSpecialMapData } from "../useSpecialMapData";
import { createWrapper } from "./test-utils";

const mockData = [
  { country: "台灣", mapId: "special-tw-pun", challengeUrl: "url1", createdAt: "2026-03-01" },
];

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useSpecialMapData", () => {
  it("fetches from /api/special-map", async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    });
    vi.stubGlobal("fetch", mockFetch);

    const { result } = renderHook(() => useSpecialMapData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/special-map")
    );
    expect(result.current.data).toEqual(mockData);
  });

  it("throws on non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    const { result } = renderHook(() => useSpecialMapData(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("資料載入失敗");
  });
});
