
const file_manager = require('fs');
const inquirer = require('inquirer');

const WORKING_DIR = process.cwd();
const GENERATOR_DIR = __dirname;
const TEMPLATES_DIR = `${GENERATOR_DIR}/templates/projects`;
const TEMPLATES = file_manager.readdirSync(TEMPLATES_DIR);
const QUESTIONS = [
  {
    name: 'template',
    type: 'list',
    message: 'Choose project template:',
    choices: TEMPLATES
  },{
    name: 'project-name',
    type: 'input',
    message: 'Choose name for project:',
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];


/**
* Generator class
* used for project and component generation
* @return {[list]} list of functions
*/
exports.Generator = () => {
  /**
  * Copy project template to working directory
  * @param  {[string]} template     template name
  * @param  {[string]} project_name name for the new project
  */
  var copy_template = (template, project) => {
    const template_path = `${TEMPLATES_DIR}/${template}`;
    const working_path = `${WORKING_DIR}/${project}`;

    // read template files to array
    const files = file_manager.readdirSync(template_path);

    files.forEach(file => {
      const new_file_path = `${working_path}/${file}`;
      const file_original_path = `${template_path}/${file}`;
      const file_properties = file_manager.statSync(file_original_path);

      /**
      * If file is file, create it.
      * If file is directory copy it recursively.
      * @param  {[any]} file_properties file stats
      */
      if(file_properties.isFile()){
        const file_content = file_manager.readFileSync(file_original_path, 'utf8');
        file_manager.writeFileSync(new_file_path, file_content, 'utf8');
      } else if(file_properties.isDirectory()){
        file_manager.mkdirSync(new_file_path);
        copy_template(`${template}/${file}`, `${project}/${file}`);
      }
    });
  }

  /**
  * Generate page for project
  * @param  {[String]} name Page name
  */
  var copy_default_page = (name) => {
    const project_templates_dir = `${WORKING_DIR}/templates`;
    const default_page_template = `${GENERATOR_DIR}/templates/page.js`;
    const destination_path = `${project_templates_dir}/${name}.page.js`;
    const routes_file_path = `${WORKING_DIR}/routes.json`;
    var route = {
      data: `${name}.page`,
      type: 'js',
      route: `/${name}`
    }
    /**
    * Create templates folder for project if not exists
    */
    if(!file_manager.existsSync(project_templates_dir)){
      file_manager.mkdirSync(project_templates_dir);
    }

    var page_content = file_manager.readFileSync(default_page_template, 'utf8');

    var routes_file = file_manager.readFileSync(routes_file_path);
    var routes = JSON.parse(routes_file, 'utf8');
    var x = 0; // 0 = page not created
    routes.forEach(r => { if(r.data == route.data){ console.log("here"); x = 1; }});

    if(!x){
      routes.push(route);
      file_manager.writeFileSync(routes_file_path, JSON.stringify(routes, null, 4), 'utf8');
      file_manager.writeFileSync(destination_path, page_content, 'utf8');
    }
  }

  /**
   * Ask for project name and template
   */
  var new_project = () => {
    inquirer.prompt(QUESTIONS).then(answers => {
      const template_choice = answers['template'];
      const project_name = answers['project-name'];

      // Create project folder and copy teplate into it
      file_manager.mkdirSync(`${WORKING_DIR}/${project_name}`);
      copy_template(template_choice, project_name);
    });
  }



  return {
    new_project: new_project,
    copy_default_page: copy_default_page,
  }
}
