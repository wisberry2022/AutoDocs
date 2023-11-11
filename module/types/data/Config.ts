export type staticConfig = {
  entry: string;
  folder: string[];
  depth: string;
  createMDX: boolean;
  createStories: boolean;
}

export type dynamicConfig = {
  [key: string]: any;
}

export type config = staticConfig & dynamicConfig;