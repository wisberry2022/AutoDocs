class Watcher {

  _ROOT_CONFIG;
  _TARGET_PATH;
  _BASENAME;

  constructor(config) {
    if (!config) throw new Error("Not Exist Config!");
    this._ROOT_CONFIG = config;
    this._TARGET_PATH = this._ROOT_CONFIG.target;
  }

  getConfig() {
    return this._ROOT_CONFIG;
  }

  getTargetPath() {
    return this._TARGET_PATH;
  }

  active(arg = false) {

  }

}

module.exports = Watcher;