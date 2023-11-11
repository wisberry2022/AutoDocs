import chokidar from 'chokidar';
import fs from 'fs';
import path, { dirname } from 'path';
import ConfigReader from './module/config/ConfigReader.ts';
import WatcherManager from './module/watcher/WatcherManager.ts';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getConfig = () => {
  const reader = new ConfigReader(__dirname);
  reader.readJSON();
  const config = reader.getConfigObj();
  return { ...config, srcs: reader.getTargetPath() };
}

const config = getConfig();
const Manager = new WatcherManager(config);
Manager.active();
