import { prefix } from '../data/LoggerPrefix.ts';

export default class Logger {

  static DETECTED: number = 0;
  static UPDATED: number = 1;
  static DELETED: number = 2;
  static ERROR: number = 3;

  static watcherLog(typeNum: number, folder: string, file: string) {
    console.log(`[${prefix[typeNum]}] [${folder}/${file}]`);
  }

}