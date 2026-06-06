import mapToPersian from './mapToPersian';

export default function makeNumericInput(inputString = '') {
  const invalidRegex = /[^۰-۹0-9]/g;
  const validRegex = /[0-9]/g;
  let val = inputString
    .replace(validRegex, mapToPersian(inputString.at(-1)))
    .replace(invalidRegex, '');
  return val;
}
