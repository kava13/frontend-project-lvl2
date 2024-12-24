import { fileURLToPath } from 'url';
import path from 'path';
import { test, expect } from '@jest/globals';
import fs from 'fs';
import genDiff from '../src';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '../', '__fixtures__', filename);
const readFixture = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff', () => {
  const path1 = getFixturePath('firstFile.json');
  const path2 = getFixturePath('secondFile.json');

  expect(genDiff(path1, path2)).toEqual(readFixture('expectedResult.txt'));
});
