import chokidar from 'chokidar';
import path from 'path';

import ComponentReader from '../writer/reader/ComponentReader.ts';
import ConfigReader from '../config/ConfigReader.ts';
import Logger from '../logger/Logger.ts';
import Watcher from './Watcher.ts';
import { dynamicConfig } from '../types/data/Config.ts';

export default class FileWatcher extends Watcher {

  _CONFIG: dynamicConfig;
  _BASENAME: string;
  _configKeys: string[] = ["createMDX", "createStories", "basename"];

  constructor(config) {
    super(config);
    this._CONFIG = ConfigReader.getExcludedConfig(super.getConfig(), this._configKeys);
    this._BASENAME = this._CONFIG.basename;
  }

  active(file: string): void {
    const reactReader: ComponentReader = new ComponentReader();
    let watcher: chokidar.FSWatcher = chokidar.watch(file);
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