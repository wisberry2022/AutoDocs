import fs from 'fs';
import path from 'path';
import Logger from '../logger/Logger.ts';

export default class AutoReader {

  LOG;
  fileMap = new Map();

  constructor() { this.LOG = new Logger(); }

  readJSFile(filePath) {
    let file = path.basename(filePath);
    const lines = fs.readFileSync(filePath, {
      encoding: "utf8", flag: "r"
    }).split("\r\n");
    this.LOG.executeLogger(filePath, "READ");
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
    this.LOG.executeLogger(fileName, "EXTRACT", obj);
    this.fileMap.set(fileName, obj);
  }

  _staticAnalysis(strArr) {
    try {
      const targets = strArr.filter(line => line.includes("export"));
      const line = targets[0].split(" ");
      return line[line.length - 1].replace(";", "").trim();
    } catch (err) {
      console.log(err);
    }

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
