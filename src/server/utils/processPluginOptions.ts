import path from "path";
import { PluginOptions, ProcessedPluginOptions } from "../../shared/interfaces";

export function processPluginOptions(
  options: PluginOptions | undefined,
  siteDir: string
): ProcessedPluginOptions {
  const config = Object.assign(
    {
      indexDocs: true,
      indexBlog: true,
      indexPages: false,
      docsBasePath: "/docs",
      blogBasePath: "/blog",
      language: "en",
      hashed: false,
      removeDefaultStopWordFilter: false,
    },
    options
  ) as ProcessedPluginOptions;
  config.docsBasePath = (config.docsBasePath as string).replace(/^\//, "");
  config.blogBasePath = (config.blogBasePath as string).replace(/^\//, "");
  if (config.docsDir) {
    config.docsDir = path.resolve(siteDir, config.docsDir);
  } else {
    config.docsDir = path.resolve(siteDir, config.docsBasePath);
  }
  if (config.blogDir) {
    config.blogDir = path.resolve(siteDir, config.blogDir);
  } else {
    config.blogDir = path.resolve(siteDir, config.blogBasePath);
  }
  if (!Array.isArray(config.language)) {
    config.language = [config.language];
  }
  return config;
}