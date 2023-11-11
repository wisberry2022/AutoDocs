import fs from 'fs';
import Logger from '../logger/Logger.ts';

export default class JSStoryWriter {

  LOG;
  COMPONENT_IMPORT_PATH = "../../../component/";
  STORIES_PATH = "\\stories\\_stories\\common\\";

  constructor() { this.LOG = new Logger(); }

  writeStoryJs(story, fileName) {
    fs.writeFileSync(fileName, this._createJSFile(story));
    this.LOG.executeLogger(fileName, "WRITE");
  }

  deleteStoryJs(removePath) {
    const parsed = removePath.split("\\");
    const fileName = parsed[parsed.length - 1].split(".")[0] + ".stories.js";

    const dirPath = removePath.split("src")[0] + "src" + this.STORIES_PATH;
    const filePath = dirPath + fileName;

    fs.unlink(filePath, err => {
      if (err) {
        console.log(`${filePath} delete fail!`, err);
      } else {
        this.LOG.executeLogger(filePath, "DELETE");
      };
    })
  }

  _createJSFile(story) {
    return `import ${story.component} from '${this.COMPONENT_IMPORT_PATH + story.component + ".js"}'; \r\n\r\n` +
      `// This file is written by AutoDocs (not Storybook's addon)! \r\n` +
      `// 담당자: ${story.author} \r\n\r\n` +
      `const Meta = { \r\n\t` +
      `title: "${story.title}", \r\n\t` +
      `component: ${story.component}, \r\n\t` +
      `argTypes: { \r\n\t\t` +
      `${Object.keys(story.prop).map((v, i) => {
        return `${v}: { \r\n\t\t description: "${story.prop[v]}" \r\n\t }
      `})}` +
      `} \r\n` +
      `} \r\n\r\n` +
      `export default Meta; \r\n\r\n` +
      `export const ${story.component + "Story"} = { \r\n\t` +
      `args: { \r\n\t\t` +
      `${Object.keys(story.prop).map((v, i) => {
        return `${v}:'example-value' \n\t\t`;
      })} \t` +
      `} \r\n` +
      `} \r\n`;
  }
}
