const ParserFactory = require("./exprparser/ParserFactory");

class NodeParser {
  constructor() {}

  seperateNode(node) {
    const { id, init } = node;
    return [id, init];
  }

  parseInit(init) {
    console.log("init ", init);
    const parser = ParserFactory.getExprParser(init, init.type);
    // console.log(parser.getIdentifierName());
  }
}

module.exports = NodeParser;
