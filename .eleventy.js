const pluginRss = require("@11ty/eleventy-plugin-rss");
const eleventySass = require("eleventy-sass");
const purgeCssPlugin = require("eleventy-plugin-purgecss");

// Own helpers
const readableDate = require("./11ty/readableDate");
const readTime = require("./11ty/readTime");
const getPostHeaders = require("./11ty/getPostHeaders");
const markdownRenderer = require("./11ty/markdownRenderer");
const groupBy = require("./11ty/groupBy");
const getHeadOfList = require("./11ty/getHeadOfList");

const TEMPLATE_ENGINE = "njk";

module.exports = (config) => {
  // Handling assets (images, fonts, etc.)
  config.addPassthroughCopy({ "./public/": "/" });
  // Conversion SCSS
  config.addPlugin(eleventySass);
  config.addPlugin(pluginRss);
  config.addPlugin(purgeCssPlugin);
  // Custom filters
  config.addFilter("readableDate", readableDate);
  config.addFilter("readtime", readTime);
  config.addFilter("head", getHeadOfList);
  config.addFilter("headers", getPostHeaders);
  config.addFilter(
    "groupByTech",
    groupBy((project) => project.tech)
  );
  config.addFilter(
    "groupByYear",
    groupBy((post) => post.data.date.getFullYear())
  );
  // Amend markdown renderer
  config.amendLibrary("md", markdownRenderer);

  return {
    markdownTemplateEngine: TEMPLATE_ENGINE,
    dataTemplateEngine: TEMPLATE_ENGINE,
    htmlTemplateEngine: TEMPLATE_ENGINE,
    dir: {
      input: "src",
      output: "_site",
    },
  };
};
