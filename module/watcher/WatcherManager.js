const DirWatcher = require('./DirWatcher');

class WatcherManager {

  _CONFIG;
  _DirWatcherList;

  constructor(config) {
    if (!config) throw new Error("Not Exist AutoDocs Config");
    this._CONFIG = config;
    this._setup();
  }

  active() {
    this._DirWatcherList.forEach(watcher => {
      watcher.active();

    });
  }

  _setup() {
    const srcs = this._CONFIG.srcs;
    this._DirWatcherList = srcs.map((src, idx) => {
      return new DirWatcher({ ...this._CONFIG, target: src, basename: this._CONFIG.folder[idx] });
    });
  }
}

module.exports = WatcherManager;