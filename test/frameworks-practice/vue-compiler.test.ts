import { beforeEach, describe, expect, test, vi } from "vitest";
import { parseTokens, tokenize } from "./vue-compiler";

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

  describe("AST Generation", () => {
    test("parseTokens to ast", () => {
      const ast = parseTokens([
        { type: "tag", name: "div" },
        { type: "tag", name: "p" },
        { type: "text", content: "Vue" },
        { type: "tagEnd", name: "p" },
        { type: "tag", name: "p" },
        { type: "text", content: "Template" },
        { type: "tagEnd", name: "p" },
        { type: "tagEnd", name: "div" },
      ]);
      expect(ast).toEqual({
        type: "Root",
        children: [
          {
            type: "Element",
            tag: "div",
            children: [
              {
                type: "Element",
                tag: "p",
                children: [
                  {
                    type: "Text",
                    content: "Vue",
                  },
                ],
              },
              {
                type: "Element",
                tag: "p",
                children: [
                  {
                    type: "Text",
                    content: "Template",
                  },
                ],
              },
            ],
          },
        ],
      });
    });
  });
});
