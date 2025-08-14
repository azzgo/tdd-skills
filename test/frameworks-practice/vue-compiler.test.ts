import { beforeEach, describe, expect, test, vi } from "vitest";
import { tokenize } from "./vue-compiler";

describe("Vue Compiler", () => {
  describe("tokenize", () => {
    test("tokenize simple text", () => {
      const tokens = tokenize("<p>Vue</p>");
      expect(tokens).toEqual([
        { type: "tag", name: "p" },
        { type: "text", content: "Vue" },
        { type: "tagEnd", name: "p" },
      ]);
    });

    test("tokenize with mutiple children", () => {
      const tokens = tokenize(" <div><p>Vue</p><p>Template</p></div>");
      expect(tokens).toEqual([
        { type: "tag", name: "div" },
        { type: "tag", name: "p" },
        { type: "text", content: "Vue" },
        { type: "tagEnd", name: "p" },
        { type: "tag", name: "p" },
        { type: "text", content: "Template" },
        { type: "tagEnd", name: "p" },
        { type: "tagEnd", name: "div" },
      ]);
    });
  });
});
