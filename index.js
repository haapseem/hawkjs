#!/usr/bin/node
require('console.table');
var help = require('./help.json').help;
var generator = require('./helpers/generator').Generator();

var arguments = process.argv.slice(2);
var command = arguments[0];

if(command == 'new'){
  generator.new_project();
} else if(command == 'generate'){
  generator.copy_default_page(arguments[1]);
} else {
  console.table(help);
}
// if(arguments[0] == 'new'){
//   projectGenerator.projectgenerator();
// } else if(arguments[0] == "generate"){
//   pageGen.generate(arguments[1]);
// }
// else if(arguments[0] == '?' || arguments[0] == 'help') {
//   // print help
//   console.table(help.help);
// } else {
//   // print help
//   console.table(help.help);
// }
