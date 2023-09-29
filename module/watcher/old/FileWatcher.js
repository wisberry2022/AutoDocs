const chokidar = require('chokidar');
const fs = require('fs');
const StoryWriter = require('../io/StoryWriter.js');
const Logger = require('../Logger.js');

class FileWatcher {

  LOG;
  COMPONENT_PATH = "\\component\\";
  TARGET_PATH;
  fileList = [];
  watcherList = [];
  writer;

  constructor(PATH) {
    this.LOG = new Logger();
    this.TARGET_PATH = PATH + this.COMPONENT_PATH;
    this.writer = new StoryWriter(PATH);
  }

  delete(removePath) {
    this.writer.delete(removePath);
  }

  update(fileList, reader) {
    this._initializingWatcher();
    fileList
      .forEach(f => {
        let watch = chokidar.watch(this.TARGET_PATH + f);
        this.watcherList.push(watch);
      })
    this._watch(reader);
  }

  _watch(reader) {
    this.watcherList.forEach(watcher => {
      watcher.on('change', async (path) => {
        this.LOG.executeLogger(path, "CHANGE")
        reader.readJSFile(path);
        const result = await reader.getStoryOption(path);
        this.writer.setStory(result);
        this.writer.write();
      })
    })
  }

  _initializingWatcher() {
    if (this.watcherList.length) {
      this.watcherList.forEach(watcher => {
        watcher.close();
      })
      this.watcherList = [];
    }
  }

}

module.exports = FileWatcher;