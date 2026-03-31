import { renderHook, waitFor } from "@testing-library/react";
import {
  useDailyChallengeMonths,
  useDailyChallengeMonth,
} from "../useDailyChallengeData";
import { createWrapper } from "./test-utils";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("useDailyChallengeMonths", () => {
  it("fetches from /api/daily-challenge/months", async () => {
    const months = ["2026-03", "2026-02"];
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(months),
    });
    vi.stubGlobal("fetch", mockFetch);

    const { result } = renderHook(() => useDailyChallengeMonths(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith("/api/daily-challenge/months");
    expect(result.current.data).toEqual(months);
  });

  it("throws on non-ok response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 500 }));

    const { result } = renderHook(() => useDailyChallengeMonths(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error?.message).toBe("月份列表載入失敗");
  });
});

describe("useDailyChallengeMonth", () => {
  it("fetches with month parameter", async () => {
    const entries = [
      { country: "世界", mapId: "world-figsy", challengeUrl: "url", createdAt: "2026-03-01" },
    ];
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(entries),
    });
    vi.stubGlobal("fetch", mockFetch);

    const { result } = renderHook(
      () => useDailyChallengeMonth("2026-03", true),
      { wrapper: createWrapper() }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(mockFetch).toHaveBeenCalledWith(
      "/api/daily-challenge?month=2026-03"
    );
  });

  it("does not fetch when enabled is false", async () => {
    const mockFetch = vi.fn();
    vi.stubGlobal("fetch", mockFetch);

    const { result } = renderHook(
      () => useDailyChallengeMonth("2026-03", false),
      { wrapper: createWrapper() }
    );

    // Wait a tick to ensure no fetch is triggered
    await new Promise((r) => setTimeout(r, 50));

    expect(mockFetch).not.toHaveBeenCalled();
    expect(result.current.fetchStatus).toBe("idle");
  });
});
