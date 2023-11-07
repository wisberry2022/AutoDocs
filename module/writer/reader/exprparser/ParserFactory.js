const FunctionExprParser = require("./FunctionExprParser");
const IdentifierExprParser = require("./IdentifierExprParser");

class ExprParserFactory {
  static getExprParser(target, targetType) {
    if (targetType === "FunctionExpression") {
      return new FunctionExprParser(target);
    } else if (targetType === "Identifier") {
      return new IdentifierExprParser(target);
    } else {
      throw Error(`${targetType} is invalid Expression Parser!`);
    }
  }
}

module.exports = ExprParserFactory;
