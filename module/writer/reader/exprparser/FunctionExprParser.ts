import ExprParser from './ExprParser.ts';

export default class FunctionExprParser extends ExprParser {

  constructor(target) {
    super(target);
  }

  getIdentifierName() {
    const { name } = super.getNode().id;
    return name;
  }

  parse() {
    const body = super.getNode();
  }

  checkParser() {
    console.log(super.getParserType());
  }

  checkNode() {
    console.log(super.getNode());
  }

}