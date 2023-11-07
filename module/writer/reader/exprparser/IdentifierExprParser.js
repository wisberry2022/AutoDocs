class IdentifierExprParser {
  _node;

  constructor(target) {
    this._node = target;
  }

  getIdentifierName() {
    const { name } = this._node;
    return name;
  }
}

module.exports = IdentifierExprParser;
