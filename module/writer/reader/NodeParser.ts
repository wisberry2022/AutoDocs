import ParserFactory from "./exprparser/ParserFactory.ts";

export default class NodeParser {
  constructor() { }

  seperateNode(node: any) {
    const { id, init } = node;
    return [id, init];
  }

  parseInit(init) {
    const parser = ParserFactory.getExprParser(init);
    const title = parser.getParserType();
    console.log("=============================", title, "===============================");
    console.log(parser.getNode())
    console.log("=============================", title, "===============================");

    // console.log(parser.getIdentifierName());
  }
}