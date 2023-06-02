const cheerio = require("cheerio");

const cleanUpHTML = (html) => {
  const $ = cheerio.load(html);

  const wrapped = $("center").wrapInner("<div />");

  return wrapped.html();
};

const addCSS = (html, css) => {
  const $ = cheerio.load(html);

  $("div").append(`<style>${css}</style>`);

  return $.html();
};

module.exports = { addCSS, cleanUpHTML };
