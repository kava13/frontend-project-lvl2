import _ from 'lodash';

const stringifyValue = (value) => {
  switch (typeof value) {
    case 'object':
      return value === null ? value : '[complex value]';
    case 'string':
      return `'${value}'`;
    default:
      return `${value}`;
  }
};

const getPlain = (obj) => {
  const getPath = (data) => data.flat().join('.');
  const genResult = (data, path) =>
    data.map((key) => {
      const currentPath = getPath([path, key.key]);
      switch (key.action) {
        case 'Nested':
          return genResult(key.value, currentPath);
        case 'Delete':
          return `Property '${currentPath}' was removed`;
        case 'Added':
          return `Property '${currentPath}' was added with value: ${stringifyValue(key.value)}`;
        case 'Edit':
          return `Property '${currentPath}' was updated. From ${stringifyValue(key.value)} to ${stringifyValue(key.value2)}`;
        case 'Unchanged':
          return null;
        default:
          return '';
      }
    });
  return genResult(obj, []);
};
const makePlain = (data) => {
  const result = getPlain(data);
  const flatten = _.flattenDeep(result);
  const filtered = flatten.filter((el) => el);
  return filtered.join('\n');
};
export default makePlain;
