import fs from "fs";
import babel, { BabelFileResult } from "@babel/core";
import NodeParser from "./NodeParser.ts";
import ExprParser from "./exprparser/ExprParser.ts";

// React Component 추출 조건
// 0. 리액트 컴포넌트를 반환하는 변수여야 함.
// 1. export가 포함되어 있어야 함.
export default class ComponentReader {
  _address: string;
  _nodeParser: NodeParser;

  setPath(paths: string) {
    this._address = paths;
    this._nodeParser = new NodeParser();
  }

  read() {
    const rawCode: string = fs.readFileSync(this._address, { encoding: "utf-8" });
    const options = {
      sourceType: 'module',
      presets: ["@babel/preset-env", "@babel/preset-react"],
      sourceMaps: true,
      filename: this._address,
      ast: true,
    };
    const { code, ast } = babel.transformSync(rawCode, options as any);

    const expressions: BabelFileResult["ast"]["program"]["body"] = ast.program.body;
    const nodeMap = this._getExistedStatements(ast.program.body).reduce(
      (acc, cur) => {
        return {
          ...acc,
          [cur]: expressions.filter((expr) => expr.type === cur),
        };
      },
      {}
    );

    nodeMap.VariableDeclaration.forEach((node: any) => {
      console.log("Node ", node);
      const [left, right] = this._nodeParser.seperateNode(node.declarations[0]);

      this._nodeParser.parseInit(right);
      // console.log("left ", left, " right ", right);
      // console.log("declar ", node.declarations[0]);
    });
  }

  _getExistedStatements(expressions: BabelFileResult["ast"]["program"]["body"]): any[] {
    const result: any[] = [];
    expressions.map(
      (expr) => !result.includes(expr.type) && result.push(expr.type)
    );
    return result;
  }
}

