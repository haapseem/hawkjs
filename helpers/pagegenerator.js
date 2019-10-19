const fs = require('fs');
const CURR_DIR = process.cwd();

exports.generate = (name) => {
  /*
  If folder doesn't exist create folder
   */
  if(!fs.existsSync(`${CURR_DIR}/templates`)){
    fs.mkdirSync(`${CURR_DIR}/templates`);
  }

  var pagePath = `${__dirname}/templates/page.js`;
  var destPath = `${CURR_DIR}/templates/${name}.page.js`;
  var content = fs.readFileSync(pagePath, 'utf8');
  fs.writeFileSync(destPath, content, 'utf8');

  var jsonPath = `${CURR_DIR}/routes.json`;
  var json = fs.readFileSync(jsonPath, 'utf8');
  json = JSON.parse(json);
  json.push({
    data: `${name}.page`,
    type: 'js',
    route: `/${name}`
  });
  fs.writeFileSync(jsonPath, JSON.stringify(json), 'utf8');
}
