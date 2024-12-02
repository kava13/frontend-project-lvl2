#!/usr/bin/env node
const { program } = require('commander');

program.name('gendiff').description('  Compares two configuration files and shows a difference.');

program
  .argument('[filepath1]', 'First file to compare')
  .argument('[filepath2]', 'Second file to compare')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format');
//   .option('-h, --help', 'output usage information');

program.parse();
