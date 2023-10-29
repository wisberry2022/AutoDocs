const chokidar = require('chokidar');
const path = require('path');

const ComponentReader = require('../writer/reader/ComponentReader');
const ConfigReader = require('../config/ConfigReader');
const Logger = require('../logger/Logger')
const Watcher = require('./Watcher');

class FileWatcher extends Watcher {

  _CONFIG;
  _BASENAME
  _fileList = [];
  _configKeys = ["createMDX", "createStories", "basename"];

  constructor(config) {
    console.log('FileWatcher 객체 생성!');
    super(config);
    this._CONFIG = ConfigReader.getExcludedConfig(super.getConfig(), this._configKeys);
    this._BASENAME = this._CONFIG.basename;
  }

  active(file) {
    const reactReader = new ComponentReader();
    let watcher = chokidar.watch(file);
    watcher
      .on('add', paths => {
        Logger.watcherLog(Logger.DETECTED, this._BASENAME, path.basename(paths));
      })
      .on('change', paths => {
        Logger.watcherLog(Logger.UPDATED, this._BASENAME, path.basename(paths));
        reactReader.setPath(paths);
        reactReader.read();
      })
      .on('unlink', paths => {
        Logger.watcherLog(Logger.DELETED, this._BASENAME, path.basename(paths));
      })
  }

}

module.exports = FileWatcher;