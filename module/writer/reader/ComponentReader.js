const fs = require("fs");
const babel = require("@babel/core");
const NodeParser = require("./NodeParser");

// React Component 추출 조건
// 0. 리액트 컴포넌트를 반환하는 변수여야 함.
// 1. export가 포함되어 있어야 함.
class ComponentReader {
  _address;
  _nodeParser;

  setPath(paths) {
    this._address = paths;
    this._nodeParser = new NodeParser();
    console.log("component address: ", this._address);
  }

  read() {
    const rawCode = fs.readFileSync(this._address, { encoding: "utf-8" }, "r");
    const options = {
      sourceType: "module",
      presets: ["@babel/preset-env", "@babel/preset-react"],
      sourceMaps: true,
      filename: this._address,
      ast: true,
    };
    const { code, ast } = babel.transformSync(rawCode, options);

    console.log("=====================code=====================");
    console.log(code);
    console.log("=====================code=====================");

    const expressions = ast.program.body;
    const nodeMap = this._getExistedStatements(ast.program.body).reduce(
      (acc, cur) => {
        return {
          ...acc,
          [cur]: expressions.filter((expr) => expr.type === cur),
        };
      },
      {}
    );

    nodeMap.VariableDeclaration.forEach((node) => {
      const [left, right] = this._nodeParser.seperateNode(node.declarations[0]);
      this._nodeParser.parseInit(right);
      // console.log("left ", left, " right ", right);
      // console.log("declar ", node.declarations[0]);
    });
  }

  _getExistedStatements(expressions) {
    const result = [];
    expressions.map(
      (expr) => !result.includes(expr.type) && result.push(expr.type)
    );
    return result;
  }
}

module.exports = ComponentReader;
