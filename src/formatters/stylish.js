import _ from 'lodash';

const signs = {
  added: '+ ',
  deleted: '- ',
  spase: '  ',
};

const replacer = ' ';
const spacesCount = 4;
const genIdentationString = (depth) => replacer.repeat(spacesCount * depth - 2);
const braceIndent = (depth) => replacer.repeat(spacesCount * depth - spacesCount);
const stringifyValue = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return value;
  }
  const line = _.keys(value).map((key) => `${genIdentationString(depth)}  ${key}: ${stringifyValue(value[key], depth + 1)}`);
  return `{\n${line.join('\n')}\n${braceIndent(depth)}}`;
};

const getStylish = (diffTree) => {
  const iter = (innerTree, level = 1) => {
    const result = innerTree.map((key) => {
      switch (key.action) {
        case 'Delete':
          return `${genIdentationString(level)}${signs.deleted}${key.key}: ${stringifyValue(key.value, level + 1)}`;
        case 'Added':
          return `${genIdentationString(level)}${signs.added}${key.key}: ${stringifyValue(key.value, level + 1)}`;
        case 'Edit':
          return `${genIdentationString(level)}${signs.deleted}${key.key}: ${stringifyValue(key.value, level + 1)}\n${genIdentationString(
            level
          )}${signs.added}${key.key}: ${stringifyValue(key.value2, level + 1)}`;
        case 'Nested':
          return `${genIdentationString(level)}${signs.spase}${key.key}: ${iter(key.value, level + 1)}`;
        default:
          return `${genIdentationString(level)}${signs.spase}${key.key}: ${stringifyValue(key.value, level + 1)}`;
      }
    });
    return ['{', ...result, `${braceIndent(level)}}`].join('\n');
  };
  return iter(diffTree);
};
export default getStylish;
