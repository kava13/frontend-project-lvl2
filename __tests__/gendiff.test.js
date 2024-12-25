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
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');

  const path3 = getFixturePath('file1.yml');
  const path4 = getFixturePath('file2.yml');

  expect(genDiff(path1, path2)).toEqual(readFixture('expected_diff.txt'));
  expect(genDiff(path3, path4)).toEqual(readFixture('expected_diff.txt'));

  expect(genDiff(path1, path2, 'plain')).toEqual(readFixture('expected_diff_plain.txt'));
  expect(genDiff(path3, path4, 'plain')).toEqual(readFixture('expected_diff_plain.txt'));

  expect(genDiff(path1, path2, 'json')).toEqual(readFixture('expected_diff_json.txt'));
  expect(genDiff(path3, path4, 'json')).toEqual(readFixture('expected_diff_json.txt'));
});
