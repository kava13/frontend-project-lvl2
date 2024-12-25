import getStylish from './stylish.js';
import getPlain from './plain.js';

const makeFormat = (dataDiff, format = 'stylish') => {
  if (format === 'stylish') {
    return getStylish(dataDiff);
  }
  if (format === 'plain') {
    return getPlain(dataDiff);
  }
  if (format === 'json') {
    return JSON.stringify(dataDiff);
  }
  return null;
};
export default makeFormat;
