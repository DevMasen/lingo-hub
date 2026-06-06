export default function mapToPersian(char = '') {
  if (char.length !== 1) return '';
  const numberMap = new Map()
    .set('0', '۰')
    .set('1', '۱')
    .set('2', '۲')
    .set('3', '۳')
    .set('4', '۴')
    .set('5', '۵')
    .set('6', '۶')
    .set('7', '۷')
    .set('8', '۸')
    .set('9', '۹');
  return numberMap.get(char);
}
