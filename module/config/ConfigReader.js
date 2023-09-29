const fs = require('fs');

class ConfigReader {

  ENTRY_PATH;
  config;

  constructor(root) {
    if (!root) {
      throw new Error("Not Exist Root Folder");
    }
    this.ENTRY_PATH = root.replace(/\\/g, "/");
  }

  readJSON() {
    try {
      const result = fs.readFileSync(this.ENTRY_PATH + "/config.json", { encoding: "utf-8", flag: "r" });
      this.config = JSON.parse(result);
    } catch (err) {
      console.log(err.name, " ", err.message);
    }
  }

  getConfigObj() {
    return this.config;
  }

  getAbsoluteEntryPath() {
    return this.ENTRY_PATH + this.config.entry;
  }

  getTargetPath() {
    const folders = this.config.folder;
    if (typeof folders === "string") {
      return [this.getAbsoluteEntryPath(), folders].join("/");
    }
    return folders.map(fd => [this.getAbsoluteEntryPath(), fd].join("/"));
  }

  static getExcludedConfig(config, keys) {
    if (!config) throw new Error("Not Exist Config!");
    const filtered = keys.reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: config[cur]
      }
    }, {})
    return filtered;
  }

}

module.exports = ConfigReader;