const chokidar = require('chokidar');
const Watcher = require('./Watcher');
const ConfigReader = require('../config/ConfigReader');
const path = require('path');

class FileWatcher extends Watcher {

  _CONFIG;
  _BASENAME
  _fileList = [];
  _configKeys = ["createMDX", "createStories", "basename"];

  constructor(config) {
    super(config);
    this._CONFIG = ConfigReader.getExcludedConfig(super.getConfig(), this._configKeys);
    this._BASENAME = this._CONFIG.basename;
  }

  active(file) {
    let watcher = chokidar.watch(file);
    watcher.on('add', paths => {
      console.log(this._BASENAME, path.basename(paths));
    })
  }

}

module.exports = FileWatcher;