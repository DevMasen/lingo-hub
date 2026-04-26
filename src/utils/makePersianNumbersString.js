import mapToPersian from './mapToPersian';
export default function makePersianNumberString(inputString = '') {
  const charArray = inputString.split('');
  const result = charArray
    .map((char) => (/[0-9]/g.test(char) ? mapToPersian(char) : char))
    .join('');
  return result;
}
