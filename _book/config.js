/*
 * @Author: cc
 * @LastEditTime: 2020-11-03 16:16:32
 */
var CONFIG = {
  // your website's title
  document_title: "常成的笔记",

  // index page
  index: "README.md",

  // sidebar file
  sidebar_file: "sidebar.md",

  // where the docs are actually stored on github - so you can edit
  base_url: "https://github.com/ruanyf/es6tutorial/edit/gh-pages",
};

// **************************
// DON'T EDIT FOLLOWING CODES
// **************************

addConfig(ditto, CONFIG);

function addConfig (obj, conf) {
  Object.keys(conf).forEach(function (key) {
    obj[key] = conf[key];
  });
}

ditto.run();
