const fs = require('fs');
const babel = require('@babel/core');

// React Component 추출 조건
// 0. 리액트 컴포넌트를 반환하는 변수여야 함.
// 1. export가 포함되어 있어야 함.
class ComponentReader {

  _address;

  setPath(paths) {
    this._address = paths;
    console.log("component address: ", this._address);
  }

  read() {
    const rawCode = fs.readFileSync(this._address, { encoding: "utf-8" }, "r");
    const options = {
      sourceType: "module",
      presets: ['@babel/preset-env', '@babel/preset-react'],
      sourceMaps: true,
      filename: this._address,
      ast: true
    }
    const { code, ast } = babel.transformSync(rawCode, options);

    console.log("=====================programBody=====================");
    // console.log(ast.program.body);
    console.log(code);
    console.log("=====================programBody=====================");

    const expressions = ast.program.body;
    const statements = this._getExistedStatements(expressions);

    const nodeMap = statements.reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: expressions.filter(expr => expr.type === cur)
      }
    }, {});

    console.log(nodeMap);

    // console.log("=====================expression=====================");
    // statements.forEach(stmt => stmt === "ExpressionStatement" && nodeMap[stmt].forEach(node => console.log(node.expression)));
    // console.log("=====================expression=====================");
    const returnStmt = [];

    console.log("=====================declaration=====================");
    statements.forEach(stmt => stmt === "VariableDeclaration" && nodeMap[stmt].forEach(node => {
      const initData = node.declarations[0].init;
      if (initData.type === "FunctionExpression") {
        const initBody = initData.body;
        if (initBody.type === "BlockStatement") {
          const innerBody = initBody.body;
          returnStmt.push(innerBody.filter(i => i.type === "ReturnStatement"));
        }
      }
    }));
    // const reactComponent = returnStmt.map(stmt => stmt.filter(i => i.argument.callee.property.name === "createElement"));
    returnStmt.map(stmt => stmt.forEach(i => console.log(i.argument)));
    // console.log(reactComponent);
    console.log("=====================declaration=====================");
  }

  _getExistedStatements(expressions) {
    const result = [];
    expressions.map(expr => !result.includes(expr.type) && result.push(expr.type));
    return result;
  }

}

module.exports = ComponentReader;