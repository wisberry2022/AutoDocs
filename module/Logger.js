const path = require('path');

class Logger {

  constructor() { }

  executeLogger(filePath, flag, data = false) {
    try {
      const monitoredPath = path.basename(filePath).toUpperCase();
      console.log(`[${monitoredPath}]: ${flag} Success!`);
      if (data) {
        console.log(`[${monitoredPath}]: Component Parsing Object: \r\n`);
        console.log(data, "\r\n");
      }

    } catch (Error) {
      console.log(Error);
    }

  }


}

module.exports = Logger;