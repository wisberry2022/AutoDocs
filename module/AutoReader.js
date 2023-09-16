const fs = require('fs');
const path = require('path');


class AutoReader {

  fileMap = new Map();

  constructor() { }

  readJSFile(filePath) {
    let file = path.basename(filePath);
    const lines = fs.readFileSync(filePath, {
      encoding: "utf8", flag: "r"
    }).split("\r\n");

    this._extractInfo(file, lines);
  }

  getStoryOption(fileName) {
    return this.fileMap.get(path.basename(fileName))
  }

  deleteStoryOption(fileName) {
    this.fileMap.delete(path.basename(fileName));
  }

  _extractInfo(fileName, strArr) {
    let obj = {};
    let component = this._staticAnalysis(strArr);
    obj['component'] = component;
    const targets = strArr.filter(line => line.includes('#'))
    try {
      targets.map(str => {
        let strPair = str.replace(/[/#]/g, "").split("-");
        obj[strPair[0].trim()] = this._extractProp(strPair[1].trim());
      });
    } catch (error) {

    }

    this.fileMap.set(fileName, obj);
  }

  _staticAnalysis(strArr) {
    const targets = strArr.filter(line => line.includes("export"));
    const line = targets[0].split(" ");
    return line[line.length - 1].replace(";", "").trim();
  }

  _extractProp(strPair) {
    if (!strPair.includes(":")) {
      return strPair;
    }
    let args = {};
    strPair.split(",").map(str => {
      let parsed = str.split(":");
      args[parsed[0].trim()] = parsed[1].trim();
    })
    return args;
  }



}

module.exports = AutoReader;