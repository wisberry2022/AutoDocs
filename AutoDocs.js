const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const ConfigReader = require('./module/config/ConfigReader');
const WatcherManager = require('./module/watcher/WatcherManager');

const getConfig = () => {
  const reader = new ConfigReader(__dirname);
  reader.readJSON();
  const config = reader.getConfigObj();
  return { ...config, srcs: reader.getTargetPath() };
}

const config = getConfig();
const Manager = new WatcherManager(config);
Manager.active();
// const dirWatcher = new DirectoryWatcher(WORK_PATH, new FileWatcher(WORK_PATH));
// dirWatcher.watchDir();
