#!/usr/bin/node
require('console.table');
var help = require('./help.json');
var projectGenerator = require('./helpers/projectgenerator');
var pageGen = require('./helpers/pagegenerator');
var arguments = process.argv.slice(2);

if(arguments[0] == 'new'){
  projectGenerator.projectgenerator();
} else if(arguments[0] == "generate"){
  pageGen.generate(arguments[1]);
}
else if(arguments[0] == '?' || arguments[0] == 'help') {
  // print help
  console.table(help.help);
} else {
  // print help
  console.table(help.help);
}
