import _ from 'lodash';

export const createDiffTree = (obj1, obj2) => {
  const allKeys = _.sortBy(_.uniq([...Object.keys(obj1), ...Object.keys(obj2)])).map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        action: 'Nested',
        key,
        value: createDiffTree(value1, value2),
      };
    }
    if (key in obj2 && !(key in obj1)) {
      return {
        action: 'Added',
        key,
        value: value2,
      };
    }
    if (key in obj1 && key in obj2 && value1 !== value2) {
      return {
        action: 'Edit',
        key,
        value: value1,
        value2,
      };
    }
    if (key in obj1 && key in obj2 && value1 === value2) {
      return {
        action: 'Unchanged',
        key,
        value: value1,
      };
    }
    if (key in obj1 && !(key in obj2)) {
      return {
        action: 'Delete',
        key,
        value: value1,
      };
    }
    return null;
  });
  return allKeys;
};
