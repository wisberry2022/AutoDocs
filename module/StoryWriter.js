const fs = require('fs');
const MdxWriter = require('./MdxWriter.js');
const JSStoryWriter = require('./JSStoryWriter.js');

class StoryWriter {

  FILE_MAP = { story: ".stories.js", mdx: ".mdx" }
  STORIES_PATH = "\\stories\\_stories\\common\\";
  // ToDo: 실제 프로젝트에 맞는 경로 재설정 필요

  TARGET_PATH;

  story;
  MdxWriter;
  JsStoryWriter;

  constructor(PATH) {
    this.mdxWriter = new MdxWriter();
    this.JsStoryWriter = new JSStoryWriter();
    this.MdxWriter = new MdxWriter();
    this.TARGET_PATH = PATH + this.STORIES_PATH;
  }

  setStory(story) {
    this.story = story;
  }

  write() {
    this.JsStoryWriter.writeStoryJs(this.story, this._getFileName('story'));
    this.MdxWriter.writeMdx(this.story, this._getFileName('mdx'));
  }

  delete(removePath) {
    this.JsStoryWriter.deleteStoryJs(removePath);
    this.MdxWriter.deleteMdx(this._getFileName('mdx'), removePath);
  }

  _getFileName(fileType) {
    const fileName = fileType === "story"
      ? this.TARGET_PATH + this.story.component + this.FILE_MAP[fileType]
      : this.TARGET_PATH + "Common" + this.FILE_MAP[fileType]
    return fileName;
  }

}

module.exports = StoryWriter;