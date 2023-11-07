class FunctionExprParser {
  _node;

  constructor(target) {
    this._node = target;
  }

  getIdentifierName() {
    const { name } = this._node.id;
    return name;
  }

  bodyParse() {
    const body = this._node.body;
  }
}

module.exports = FunctionExprParser;
