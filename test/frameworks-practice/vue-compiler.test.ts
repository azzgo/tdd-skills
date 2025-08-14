import { beforeEach, describe, expect, test, vi } from "vitest";
import {
  generateJS,
  parseTokens,
  tokenize,
  transformAST,
} from "@/utils/vue-compiler";

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

  describe("AST Transformation", () => {
    test("transform AST to render function", () => {
      const ast = {
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
      };
      transformAST(ast as any);
      expect((ast as any).jsNode).toMatchSnapshot();
    });
  });

  describe("Code Generation", () => {
    test("generate code from AST", () => {
      const jsNode = {
        body: [
          {
            return: {
              arguments: [
                {
                  type: "StringLiteral",
                  value: "div",
                },
                {
                  elements: [
                    {
                      arguments: [
                        {
                          type: "StringLiteral",
                          value: "p",
                        },
                        {
                          type: "StringLiteral",
                          value: "Vue",
                        },
                      ],
                      callee: {
                        name: "h",
                        type: "Identifier",
                      },
                      type: "CallExpression",
                    },
                    {
                      arguments: [
                        {
                          type: "StringLiteral",
                          value: "p",
                        },
                        {
                          type: "StringLiteral",
                          value: "Template",
                        },
                      ],
                      callee: {
                        name: "h",
                        type: "Identifier",
                      },
                      type: "CallExpression",
                    },
                  ],
                  type: "ArrayExpression",
                },
              ],
              callee: {
                name: "h",
                type: "Identifier",
              },
              type: "CallExpression",
            },
            type: "ReturnStatement",
          },
        ],
        id: {
          name: "render",
          type: "Identifier",
        },
        params: [],
        type: "FunctionDecl",
      };

      const code = generateJS(jsNode);
      expect(code).toMatchSnapshot();
    });
  });
});
