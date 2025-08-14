type Token = {
  type: string;
  name?: string;
  content?: string;
};

type ASTNode = {
  type: "ELement" | "Text" | "Root" | "Element";
  tag?: string;
  content?: string;
  children?: ASTNode[];
  jsNode?: JSASTNode; // 用于存储转换后的 JS AST 节点
};

type JSASTNode = {
  type: string;
};

interface FunctionASTNode extends JSASTNode {
  type: "FunctionDecl";
  id: {
    type: "Identifier";
    name: string;
  };
  params: string[];
  body: JSASTNode | ReturnStatement[];
}
interface CallExp extends JSASTNode {
  type: "CallExpression";
  callee: {
    type: "Identifier";
    name: string;
  };
  arguments: JSASTNode[];
}

interface StringLiteral extends JSASTNode {
  type: "StringLiteral";
  value: string;
}

interface ArrayExpression extends JSASTNode {
  type: "ArrayExpression";
  elements: JSASTNode[];
}

interface ReturnStatement extends JSASTNode {
  type: "ReturnStatement";
  return: JSASTNode;
}

type OnExit = () => void;
type TransformFunction = (
  node: ASTNode,
  context: TransformContext,
) => void | OnExit;

type TransformContext = {
  currentNode: ASTNode | null;
  parentNode: ASTNode | null;
  childIndex: number;
  replaceNode: (newNode: ASTNode) => void;
  removeNode: () => void;
  nodeTransforms: TransformFunction[];
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

const transformNode = (ast: ASTNode, context: TransformContext): void => {
  context.currentNode = ast;
  const exitFns: OnExit[] = [];
  for (let i = 0; i < context.nodeTransforms.length; i++) {
    const transform = context.nodeTransforms[i];
    const onExit = transform(ast, context);
    if (onExit) {
      exitFns.push(onExit);
    }
    if (context.currentNode === null) {
      return;
    }
  }
  if (ast.children) {
    ast.children.forEach((child: any, index: number) => {
      context.parentNode = ast;
      context.childIndex = index;
      transformNode(child, context);
      context.parentNode = null;
    });
  }
  for (let i = exitFns.length - 1; i >= 0; i--) {
    const exitFn = exitFns[i];
    exitFn();
  }
};

const createStringLiteral = (value: string): StringLiteral => {
  return {
    type: "StringLiteral",
    value,
  };
};
const createIdentifier = (
  name: string,
): { type: "Identifier"; name: string } => {
  return {
    type: "Identifier",
    name,
  };
};

const createArrayExpression = (elements: JSASTNode[]): ArrayExpression => {
  return {
    type: "ArrayExpression",
    elements,
  };
};

const createCallExpression = (callee: string, args: JSASTNode[]): CallExp => {
  return {
    type: "CallExpression",
    arguments: args,
    callee: createIdentifier(callee),
  };
};

const transformText: TransformFunction = (node, context) => {
  if (node.type !== "Text") {
    return;
  }

  node.jsNode = createStringLiteral(node.content || "");
};

const transformElement: TransformFunction = (node, context) => {
  if (node.type !== "Element") {
    return;
  }

  return () => {
    const callExp: CallExp = createCallExpression("h", [
      createStringLiteral(node.tag!),
    ]);
    if (node.children?.length === 1) {
      callExp.arguments.push(node.children[0].jsNode!);
    } else if ((node.children?.length ?? 0) > 1) {
      callExp.arguments.push(
        createArrayExpression(
          node.children!.map((child) => child.jsNode!) || [],
        ),
      );
    }
    node.jsNode = callExp;
  };
};

const transformRoot: TransformFunction = (node, context) => {
  if (node.type !== "Root") {
    return;
  }

  return () => {
    const functionNode: FunctionASTNode = {
      type: "FunctionDecl",
      id: createIdentifier("render"),
      params: [],
      body: [
        {
          type: "ReturnStatement",
          return: node.children![0].jsNode!, // 假设根节点只有一个子元素
        },
      ],
    };
    node.jsNode = functionNode;
  };
};

export const transformAST = (ast: ASTNode): void => {
  const context: TransformContext = {
    currentNode: null,
    parentNode: null,
    replaceNode: (newNode: ASTNode) => {
      if (context.parentNode) {
        context.parentNode.children![context.childIndex] = newNode;
      }
    },
    removeNode: () => {
      if (context.parentNode) {
        context.parentNode.children!.splice(context.childIndex, 1);
      }
      context.currentNode = null;
    },
    childIndex: 0,
    nodeTransforms: [
      transformRoot,
      transformText,
      transformElement,
    ],
  };
  transformNode(ast, context);
};

export const generateJS = (jsAst: JSASTNode): string => {};
