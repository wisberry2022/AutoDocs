const prefix = require('../data/LoggerPrefix');

class Logger {

  static DETECTED = 0;
  static UPDATED = 1;
  static DELETED = 2;
  static ERROR = 3;

  static watcherLog(typeNum, folder, file) {
    console.log(`[${prefix[typeNum]}] [${folder}/${file}]`);
  }

}

module.exports = Logger;