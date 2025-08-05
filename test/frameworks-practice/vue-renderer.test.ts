import { beforeEach, describe, expect, test } from "vitest";
import { createRenderer } from "@/utils/vue-renderer";

describe("Vue Renderer", () => {
  beforeEach(async () => {
    document.body.innerHTML = "";
    // @ts-expect-error Reset the _vnode property to ensure clean state for each test
    document.body._vnode = null;
  });
  describe("mountElement", () => {
    test("mount single node with text", () => {
      const renderer = createRenderer();
      const vnode = {
        type: "div",
        children: "Hello, Vue!",
      };
      renderer.render(vnode, document.body);
      const appElement = document.body.childNodes[0] as HTMLElement;
      expect(appElement).toBeDefined();
      expect(appElement?.textContent).toBe("Hello, Vue!");
    });

    test("mount node with multile text children", () => {
      const renderer = createRenderer();
      const vnode = {
        type: "div",
        children: [
          {
            type: "p",
            children: "First paragraph",
          },
          {
            type: "p",
            children: "Second paragraph",
          },
        ],
      };
      renderer.render(vnode, document.body);
      console.log("🚀 file:vue-renderer.test.ts-line:38 ", document.body.childNodes.length);
      const appElement = document.body.childNodes[0] as HTMLElement;
      expect(appElement).toBeDefined();
      expect(appElement.childNodes.length).toBe(2);
      expect(appElement.childNodes[0].textContent).toBe("First paragraph");
      expect(appElement.childNodes[1].textContent).toBe("Second paragraph");
    });
  });
});
