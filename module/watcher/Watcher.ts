import { config, dynamicConfig } from "../types/data/Config";

export default class Watcher {

  _ROOT_CONFIG: dynamicConfig;
  _TARGET_PATH: string;
  _BASENAME: string;

  constructor(config: config) {
    if (!config) throw new Error("Not Exist Config!");
    this._ROOT_CONFIG = config;
    this._TARGET_PATH = this._ROOT_CONFIG.target;
  }

  getConfig(): dynamicConfig {
    return this._ROOT_CONFIG;
  }

  getTargetPath(): string {
    return this._TARGET_PATH;
  }

  active(arg?: string): void {

  }

}