#!/usr/bin/env node
import { program } from 'commander';
import genDiff from '../src/index.js';

// Описание программы и версии
program.name('gendiff').description('Compares two configuration files and shows a difference.').version('1.0.0');

// Определение аргументов
program
  .argument('<filepath1>', 'First file to compare') // Первый файл
  .argument('<filepath2>', 'Second file to compare'); // Второй файл

// Опции, например, формат вывода
program.option('-f, --format [type]', 'output format', 'stylish'); // Опция для выбора формата

program.action((arg1, arg2) => {
  const result = genDiff(arg1, arg2, program.opts().format);

  // eslint-disable-next-line no-console
  console.log(result);
});
// Разбор аргументов и опций
program.parse();
