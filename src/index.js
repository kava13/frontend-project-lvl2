import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';
import createDiffTree from './createDiffTree.js';
import formatOutput from './formatters/index.js';

// Возвращает абсолютный путь к директории, из которой был вызван процесс
// eslint-disable-next-line arrow-body-style
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

const getExtension = (filename) => path.extname(filename);

const getParseFn = (extension) => {
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load;
  }

  return JSON.parse;
};

const genDiff = (pathToFile1, pathToFile2, format = 'stylish') => {
  const content1 = getFileContent(pathToFile1);
  const content2 = getFileContent(pathToFile2);

  const parseFn1 = getParseFn(getExtension(pathToFile1));
  const parseFn2 = getParseFn(getExtension(pathToFile2));

  const parsedContent1 = parseFn1(content1);
  const parsedContent2 = parseFn2(content2);

  const diffObject = createDiffTree(parsedContent1, parsedContent2);

  return formatOutput(diffObject, format);
};

export default genDiff;
