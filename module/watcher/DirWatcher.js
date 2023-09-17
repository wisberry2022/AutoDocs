const chokidar = require('chokidar');
const AutoReader = require('../io/AutoReader.js');
const Logger = require('../Logger.js');
const fs = require('fs');
const path = require('path');

class DirectoryObserver {

  COMPONENT_DIR_PATH = "\\component";
  TARGET_PATH;
  DIR_WATCHER;
  FIEL_WATCHER;
  LOG;

  reader;
  fileList;

  constructor(PATH, FILE_WATCHER) {
    this.LOG = new Logger();
    this.TARGET_PATH = PATH + this.COMPONENT_DIR_PATH;
    this.DIR_WATCHER = chokidar.watch(this.TARGET_PATH);
    this.FILE_WATCHER = FILE_WATCHER;
    this.reader = new AutoReader();
  }

  watchDir() {
    this.DIR_WATCHER.on('add', paths => {
      if (paths.split("src")[1].split("\\").length === 3) {
        this._readJSFile();
      };

    })
      .on('unlink', paths => {
        if (paths.split("src")[1].split("\\").length === 3) {
          this._readJSFile(paths);
          this.reader.deleteStoryOption(paths);
        }
      });
  }

  _readJSFile(removePath = false) {
    fs.readdir(this.TARGET_PATH, (err, fileList) => {
      this.fileList = this._getJSFile(fileList);
      this.FILE_WATCHER.update(this.fileList, this.reader);
      removePath && this.FILE_WATCHER.delete(removePath);
    });
  }

  _getJSFile(fileList) {
    return fileList.filter(f => f.split(".").length == 2);
  }
}

module.exports = DirectoryObserver