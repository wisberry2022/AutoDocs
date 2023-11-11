import fs from 'fs';
import { config, dynamicConfig, staticConfig } from '../types/data/Config';

export default class ConfigReader {

  ENTRY_PATH: string;
  config: staticConfig;

  constructor(root: string) {
    if (!root) {
      throw new Error("Not Exist Root Folder");
    }
    this.ENTRY_PATH = root.replace(/\\/g, "/");
  }

  readJSON(): void {
    try {
      const result: string = fs.readFileSync(this.ENTRY_PATH + "/config.json", { encoding: "utf-8", flag: "r" });
      this.config = JSON.parse(result);
    } catch (err) {
      console.log(err.name, " ", err.message);
    }
  }

  getConfigObj(): staticConfig {
    return this.config;
  }

  getAbsoluteEntryPath(): string {
    return this.ENTRY_PATH + this.config.entry;
  }

  getTargetPath(): string | string[] {
    const folders = this.config.folder;
    if (typeof folders === "string") {
      return [this.getAbsoluteEntryPath(), folders].join("/");
    }
    return folders.map(fd => [this.getAbsoluteEntryPath(), fd].join("/"));
  }

  static getExcludedConfig(config: staticConfig | dynamicConfig | config, keys: string[]): config {
    if (!config) throw new Error("Not Exist Config!");
    const filtered = keys.reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: config[cur]
      }
    }, {} as config)
    return filtered;
  }

}