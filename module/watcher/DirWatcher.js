const chokidar = require('chokidar');
const Watcher = require("./Watcher");
const FileWatcher = require('./FileWatcher');
const ConfigReader = require('../config/ConfigReader');
const fs = require('fs');

class DirWatcher extends Watcher {

  _PATH;
  _CONFIG
  _fileWatcher;
  _configKeys = ["target", "depth"];

  constructor(config) {
    super(config);
    this._PATH = super.getTargetPath();
    this._CONFIG = ConfigReader.getExcludedConfig(super.getConfig(), this._configKeys);
    this._fileWatcher = new FileWatcher(super.getConfig());
  }

  active() {
    const watcher = chokidar.watch(this._PATH);
    watcher.on('add', paths => {
      this._fileWatcher.active(paths);
    })
  }


}

module.exports = DirWatcher; 