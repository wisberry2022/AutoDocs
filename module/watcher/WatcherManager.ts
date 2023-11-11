import { config } from '../types/data/Config.ts';
import DirWatcher from './DirWatcher.ts';

export default class WatcherManager {

  _CONFIG: config;
  _DirWatcherList: DirWatcher[];

  constructor(config: config) {
    if (!config) throw new Error("Not Exist AutoDocs Config");
    this._CONFIG = config;
    this._setup();
  }

  active(): void {
    this._DirWatcherList.forEach(watcher => {
      watcher.active();
    });
  }

  _setup(): void {
    const srcs: string[] = this._CONFIG.srcs;
    this._DirWatcherList = srcs.map((src, idx) => {
      return new DirWatcher({ ...this._CONFIG, target: src, basename: this._CONFIG.folder[idx] });
    });
  }
}