import FunctionExprParser from "./FunctionExprParser.ts";
import IdentifierExprParser from "./IdentifierExprParser.ts";

export default class ExprParserFactory {
  static getExprParser(target) {
    if (target.type === "FunctionExpression") {
      return new FunctionExprParser(target);
    } else if (target.type === "Identifier") {
      return new IdentifierExprParser(target);
    } else {
      throw Error(`${target.type} is invalid Expression Parser!`);
    }
  }
}