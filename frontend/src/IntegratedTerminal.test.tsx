import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import IntegratedTerminal from "./IntegratedTerminal";

beforeEach(() => {
  // jsdom has no real <video> playback or ResizeObserver, but IntegratedTerminal
  // needs both to size its overlay. Fake them so the component can render normally.
  // (The component calls `new ResizeObserver(...)`, so this has to be a real
  // constructor, not an arrow function/mock return value.)
  class MockResizeObserver {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
  }
  vi.stubGlobal("ResizeObserver", MockResizeObserver);

  // Avoid a real network call to /api/message on mount.
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ text: () => Promise.resolve("ok") })
  );

  // jsdom doesn't implement scrollTo; the component calls it to keep the
  // terminal scrolled to the bottom as new lines are added.
  Element.prototype.scrollTo = vi.fn();

  // Let TypingText's setInterval be fast-forwarded instead of actually waited on.
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("IntegratedTerminal", () => {
  it("shows the help text after typing 'help'", () => {
    render(<IntegratedTerminal />);

    // The terminal input only renders once the video reports a size, so fake one
    // and fire the event the component listens for to trigger that size calculation.
    // jsdom also doesn't do real layout, so the container's clientWidth/clientHeight
    // are always 0 unless we fake those too.
    const video = document.querySelector("video") as HTMLVideoElement;
    const container = video.parentElement as HTMLElement;
    Object.defineProperty(video, "videoWidth", { value: 800, configurable: true });
    Object.defineProperty(video, "videoHeight", { value: 600, configurable: true });
    Object.defineProperty(container, "clientWidth", { value: 1000, configurable: true });
    Object.defineProperty(container, "clientHeight", { value: 800, configurable: true });
    act(() => {
      fireEvent.loadedMetadata(video);
    });

    // Type "help" into the terminal input and submit it.
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "help" } });
    act(() => {
      fireEvent.submit(input.closest("form")!);
    });

    // Fast-forward past TypingText's character-by-character animation.
    act(() => {
      vi.advanceTimersByTime(15000);
    });

    expect(screen.getByText(/Available commands/)).toBeInTheDocument();
  });
});
