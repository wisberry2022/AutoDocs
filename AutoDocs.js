const chokidar = require('chokidar');
const fs = require('fs');
const path = require('path');
const DirectoryWatcher = require('./module/DirWatcher');
const FileWatcher = require('./module/FileWatcher');

const WORK_PATH = __dirname + "\\src";

const dirWatcher = new DirectoryWatcher(WORK_PATH, new FileWatcher(WORK_PATH));
dirWatcher.watchDir();