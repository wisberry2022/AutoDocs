import fs from 'fs';
import path from 'path';
import Logger from '../logger/Logger.ts';

export default class MdxWriter {

  LOG;
  STORY_IMPORT_PATH = "./";
  STORYBOOK_IMPORT_PATH = "'@storybook/blocks'";

  constructor() { this.LOG = new Logger(); }

  writeMdx(story, fileName) {
    const mdx = this._readCurrentMDX(fileName);
    if (mdx === "") {
      fs.writeFileSync(fileName, this._initialize(story, fileName))
      this.LOG.executeLogger(fileName, "WRITE");
      return;
    }

    if (this._isAlreadyContainStories(mdx, story.component + "Stories")) {
      return;
    }
    fs.writeFileSync(fileName, this._createMDXFile(mdx, story));
    this.LOG.executeLogger(fileName, "WRITE");
  }


  _createMDXFile(mdx, story) {
    const importingStoryFileName = story.component + "Stories";
    const storyName = story.component + "Story";
    const importLine = `import * as ${importingStoryFileName} from '${this.STORY_IMPORT_PATH + story.component + ".stories.js"}'; \r\n`;

    return importLine
      + mdx + "\r\n \r\n"
      + `## ${story.component}  담당자:  ${story.author} \r\n`
      + `<Story of={${importingStoryFileName}.${storyName}} /> \r\n`
      + `<Controls of={${importingStoryFileName}.${storyName}} /> \r\n`
      + `<Source of={${importingStoryFileName}.${storyName}} /> \r\n \r\n`;
  }


  deleteMdx(fileName, removePath) {
    const stories = path.basename(removePath).split(".js")[0];
    const mdx = this._readCurrentMDX(fileName);
    const target = mdx.split("\r\n");
    const filtered = target.filter(line => (!line.includes(stories + "Stories") && !line.includes("## " + stories + "  담당자")));
    // console.log('stories: ', stories);
    // console.log("delete filtered: ", filtered);
    fs.writeFileSync(fileName, filtered.join("\r\n"));
  }


  _isAlreadyContainStories(mdx, stories) {
    const target = mdx.split("\r\n");
    const filtered = target.filter(line => line.includes(stories));
    return filtered.length;
  }

  _readCurrentMDX(fileName) {
    if (this._isExistFile(fileName)) {
      return fs.readFileSync(fileName, { encoding: "utf8", flag: "r" });
    }
    return "";
  }

  _isExistFile(fileName) {
    return fs.existsSync(fileName)
  }

  // 최초로 Common.mdx 만들 때
  _initialize(story) {
    const importingStoryFileName = story.component + "Stories";
    const storyName = story.component + "Story";

    return `import {Meta, Story, Source, Controls} from ${this.STORYBOOK_IMPORT_PATH}; \r\n` +
      `import * as ${importingStoryFileName} from '${this.STORY_IMPORT_PATH + story.component + ".stories.js"}'; \r\n\r\n` +
      `<Meta of={${importingStoryFileName}} /> \r\n\r\n` +
      `# 공통 컴포넌트 \r\n\r\n` +
      `## ${story.component}  담당자:  ${story.author} \r\n` +
      `<Story of={${importingStoryFileName}.${storyName}} /> \r\n` +
      `<Controls of={${importingStoryFileName}.${storyName}} /> \r\n` +
      `<Source of={${importingStoryFileName}.${storyName}} /> \r\n \r\n`;
  }

}
