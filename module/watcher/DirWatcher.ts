import chokidar from 'chokidar';
import Watcher from "./Watcher.ts";
import FileWatcher from './FileWatcher.ts';
import ConfigReader from '../config/ConfigReader.ts';
import fs from 'fs';
import { config } from '../types/data/Config.ts';

export default class DirWatcher extends Watcher {

  _PATH: string;
  _CONFIG: config;
  _fileWatcher: Watcher;
  _configKeys: string[] = ["target", "depth"];

  constructor(config: config) {
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