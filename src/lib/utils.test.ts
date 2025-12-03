import { describe, test, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility function", () => {
  test("merges class names", () => {
    const result = cn("class1", "class2");
    expect(result).toBe("class1 class2");
  });

  test("handles conditional classes", () => {
    const isActive = true;
    const result = cn("base", isActive && "active");
    expect(result).toBe("base active");
  });

  test("filters out falsy values", () => {
    const result = cn("base", false && "hidden", null, undefined, "visible");
    expect(result).toBe("base visible");
  });

  test("merges Tailwind classes correctly", () => {
    const result = cn("px-2 py-1", "px-4");
    expect(result).toBe("py-1 px-4");
  });

  test("handles empty input", () => {
    const result = cn();
    expect(result).toBe("");
  });

  test("handles array of classes", () => {
    const result = cn(["class1", "class2"], "class3");
    expect(result).toBe("class1 class2 class3");
  });

  test("handles object notation", () => {
    const result = cn({
      "base-class": true,
      hidden: false,
      visible: true,
    });
    expect(result).toBe("base-class visible");
  });
});
