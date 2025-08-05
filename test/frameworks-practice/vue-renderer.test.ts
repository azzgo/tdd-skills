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
      const appElement = document.body.childNodes[0] as HTMLElement;
      expect(appElement).toBeDefined();
      expect(appElement.childNodes.length).toBe(2);
      expect(appElement.childNodes[0].textContent).toBe("First paragraph");
      expect(appElement.childNodes[1].textContent).toBe("Second paragraph");
    });

    test('mount node with attributes', () => {
      const renderer = createRenderer();
      const vnode = {
        type: "div",
        props: { id: "test", class: "container" },
      };
      renderer.render(vnode, document.body);
      const appElement = document.body.childNodes[0] as HTMLElement;
      expect(appElement).toBeDefined();
      expect(appElement.id).toBe("test");
      expect(appElement.className).toBe("container");
    });

    test('mount node with attributes and properties', () => {
      const renderer = createRenderer();
      const vnode = {
        type: "input",
        props: { type: "text", value: "Hello", disabled: false },
      };
      renderer.render(vnode, document.body);
      const appElement = document.body.childNodes[0] as HTMLInputElement;
      expect(appElement).toBeDefined();
      expect(appElement.type).toBe("text");
      expect(appElement.value).toBe("Hello");
      expect(appElement.disabled).toBe(false);
    });
  });
});
