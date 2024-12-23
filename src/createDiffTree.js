import _ from 'lodash';

export const createDiffTree = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Слияние всех ключей из двух объектов и сортировка
  const allKeys = _.sortBy([...keys1, ...keys2.filter((key) => !keys1.includes(key))]);

  const result = ['{']; // Открываем фигурные скобки

  allKeys.forEach((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    // Если ключ есть только в первом объекте
    if (key in obj1 && !(key in obj2)) {
      result.push(`- ${key}: ${value1}`);
      return;
    }

    // Если ключ есть только во втором объекте
    if (!(key in obj1) && key in obj2) {
      result.push(`+ ${key}: ${value2}`);
      return;
    }

    // Если значения равны, оставляем unchanged
    if (value1 === value2) {
      result.push(`  ${key}: ${value1}`);
      return;
    }

    // Если значения отличаются, выводим как changed
    if (value1 !== value2) {
      result.push(`- ${key}: ${value1}`);
      result.push(`+ ${key}: ${value2}`);
    }
  });

  result.push('}'); // Закрываем фигурные скобки

  return result.join('\n');
};
