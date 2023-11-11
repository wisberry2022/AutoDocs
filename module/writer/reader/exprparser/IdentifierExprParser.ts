import ExprParser from './ExprParser.ts';

export default class IdentifierExprParser extends ExprParser {
  constructor(target) {
    super(target);
  }

  getIdentifierName() {
    const { name } = super.getNode();
    return name;
  }

  parse() { }

  checkParser() {
    console.log(super.getParserType());
  }

  checkNode() {
    console.log(super.getNode());
  }
}