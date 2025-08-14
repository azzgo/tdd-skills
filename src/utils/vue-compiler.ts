type Token = {
  type: string;
  name?: string;
  content?: string;
};

type ASTNode = {
  type: "ELement" | "Text" | "Root";
  tag?: string;
  content?: string;
  children?: ASTNode[];
};

type JSASTNode = {
  type: string;
  value?: string;
  children?: JSASTNode[];
};

const State = {
  initial: 1,
  tagOpen: 2,
  tagName: 3,
  text: 4,
  tagEnd: 5,
  tagEndName: 6,
};
const isAlpha = (char: string): boolean => {
  return /^[a-zA-Z]$/.test(char);
};
/**
 * Vue 本身的 HTML 解析遵循 WHATWG HTML 标准，这里只是一个简单实现
 **/
export const tokenize = (source: string): Token[] => {
  let str = source.trim();
  let currentState = State.initial;
  const chars = [];
  const tokens = [];
  while (str.length > 0) {
    const char = str[0];
    switch (currentState) {
      case State.initial:
        if (char === "<") {
          currentState = State.tagOpen;
          str = str.slice(1);
        } else if (isAlpha(char)) {
          currentState = State.text;
          chars.push(char);
          str = str.slice(1);
        }
        break;
      case State.tagOpen:
        if (char === "/") {
          currentState = State.tagEnd;
          str = str.slice(1);
        } else if (isAlpha(char)) {
          currentState = State.tagName;
          chars.push(char);
          str = str.slice(1);
        }
        break;
      case State.tagName:
        if (char === ">") {
          tokens.push({ type: "tag", name: chars.join("") });
          chars.length = 0;
          currentState = State.initial;
          str = str.slice(1);
        } else if (isAlpha(char)) {
          chars.push(char);
          str = str.slice(1);
        }
        break;
      case State.text:
        if (char === "<") {
          tokens.push({ type: "text", content: chars.join("") });
          chars.length = 0;
          currentState = State.tagOpen;
          str = str.slice(1);
        } else if (isAlpha(char)) {
          chars.push(char);
          str = str.slice(1);
        }
        break;
      case State.tagEnd:
        if (isAlpha(char)) {
          currentState = State.tagEndName;
          chars.push(char);
          str = str.slice(1);
        }
        break;
      case State.tagEndName:
        if (char === ">") {
          tokens.push({ type: "tagEnd", name: chars.join("") });
          chars.length = 0;
          currentState = State.initial;
          str = str.slice(1);
        } else if (isAlpha(char)) {
          chars.push(char);
          str = str.slice(1);
        }
        break;
    }
  }
  return tokens;
};

export const parseTokens = (tokens: Token[]): ASTNode => {
  const root: ASTNode = { type: "Root", children: [] };
  const elementStack: ASTNode[] = [root];
  while (tokens.length > 0) {
    const parent = elementStack[elementStack.length - 1];
    const t = tokens[0];
    switch (t.type) {
      case "tag":
        const elementNode = {
          type: "Element",
          tag: t.name,
          children: [],
        };
        parent.children.push(elementNode);
        elementStack.push(elementNode);
        break;
      case "text":
        const textNode = {
          type: "Text",
          content: t.content,
        };
        parent.children.push(textNode);
        break;
      case "tagEnd":
        elementStack.pop();
        break;
    }
    tokens.shift();
  }
  return root;
};

export const transformAST = (ast: ASTNode): JSASTNode => {};

export const generateJS = (jsAst: JSASTNode): string => {};
