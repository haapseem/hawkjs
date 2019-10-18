#!/usr/bin/node
projectGenerator = require('./projectgenerator')
test = require('./test')
// import 'projectgenerator.js';

var arguments = process.argv.slice(2);

if(arguments[0] == 'new'){ projectGenerator.projectgenerator(); }
