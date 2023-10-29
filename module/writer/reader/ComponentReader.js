const fs = require('fs');
const babel = require('@babel/core');

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

    console.log(code);

    const expressions = ast.program.body.filter(node => {
      return node.type === "ExpressionStatement";
    })

    expressions.forEach(expr => {
      // if (expr.expression.type === "AssignmentExpression") {
      //   const { left, right } = expr.expression;
      //   console.log("left", left);
      //   console.log("right", right);
      //   left.type === "MemberExpression" && left.
      // }
      // if (expr.expression.type === "CallExpression") {
      //   console.log(expr.expression.arguments[2].properties);
      // }
    })
  }

}

module.exports = ComponentReader;