export default class ExprParser {

  _node;
  _parserType;

  constructor(node) {
    this._node = node;
    this._parserType = node.type.concat("_Parser");
  }

  getNode() {
    return this._node;
  }

  getParserType() {
    return this._parserType;
  }

}