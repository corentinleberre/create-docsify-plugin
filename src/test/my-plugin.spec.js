import { describe, expect, test, vi } from "vitest";
import myPlugin from "../plugin/my-plugin";

describe("my plugin", () => {
  test("should say hello", () => {
    const consoleSpy = vi.spyOn(console, "log");
    const mockHook = { init: (fn) => fn() };

    const pluginWithArgs = myPlugin({ hello: "world" });
    pluginWithArgs(mockHook);

    expect(consoleSpy).toHaveBeenNthCalledWith(1, "hello world");
  });
});
