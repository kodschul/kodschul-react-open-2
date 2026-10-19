import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useCountdown } from "./useCountdown";
import { useTodos } from "./useTodos";

describe("useTodos", () => {
  it("adds to the front, removes and clears", () => {
    const { result } = renderHook(() => useTodos(["a"]));
    act(() => result.current.addTodo("b"));
    expect(result.current.todos).toEqual(["b", "a"]);
    act(() => result.current.removeTodo("a"));
    expect(result.current.todos).toEqual(["b"]);
    act(() => result.current.removeAll());
    expect(result.current.todos).toEqual([]);
  });
});

describe("useCountdown", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("counts down to 0 and stops ticking", () => {
    const { result } = renderHook(() => useCountdown({ interval: 1000 }));
    act(() => result.current.start(2));
    expect(result.current.isRunning).toBe(true);

    act(() => vi.advanceTimersByTime(2000));
    expect(result.current.secsLeft).toBe(0);
    expect(result.current.isRunning).toBe(false);

    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.secsLeft).toBe(0);
  });

  it("pauses on stop", () => {
    const { result } = renderHook(() => useCountdown());
    act(() => result.current.start(5));
    act(() => vi.advanceTimersByTime(1000));
    act(() => result.current.stop());
    act(() => vi.advanceTimersByTime(3000));
    expect(result.current.secsLeft).toBe(4);
  });
});
