import { createDiffTree } from './createDiffTree.js';
import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

// Возвращает абсолютный путь к директории, из которой был вызван процесс (иначе говоря был вызван файл)
const getCurrentWorkingDirectory = () => {
  return process.cwd();
};

// Возвращает абсолютный путь к файлу
export const getFullPath = (filepath) => {
  const processDirectory = getCurrentWorkingDirectory();

  return path.resolve(processDirectory, filepath);
};

const getFileContent = (filepath) => {
  const fullAbsolutePath = getFullPath(filepath);

  return fs.readFileSync(fullAbsolutePath, 'utf8');
};

const getExtension = (filename) => {
  return path.extname(filename);
};

const genDiff = (pathToFile1, pathToFile2) => {
  const content1 = getFileContent(pathToFile1);
  const content2 = getFileContent(pathToFile2);

  const parseFn = getExtension(pathToFile1) === 'js' ? JSON.parse : yaml.load;

  return createDiffTree(parseFn(content1), parseFn(content2));
};

export default genDiff;
