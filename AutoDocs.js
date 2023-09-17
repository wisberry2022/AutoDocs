const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const FileWatcher = require('./module/watcher/FileWatcher');
const DirectoryWatcher = require('./module/watcher/DirWatcher');

const WORK_PATH = __dirname + "\\src";

const dirWatcher = new DirectoryWatcher(WORK_PATH, new FileWatcher(WORK_PATH));
dirWatcher.watchDir();