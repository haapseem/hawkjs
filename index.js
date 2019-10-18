#!/usr/bin/node
require('console.table');
projectGenerator = require('./projectgenerator');
var arguments = process.argv.slice(2);

if(arguments[0] == 'new'){
  projectGenerator.projectgenerator();
} else {
  // print help
  console.table([
    {
      command: 'hawkjs new',
      description: 'create new project'
    }
  ]);
}
