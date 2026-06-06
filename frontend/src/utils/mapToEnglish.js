export default function mapToEnglish(char = '') {
  if (char.length !== 1) return '';
  const numberMap = new Map()
    .set('۰', '0')
    .set('۱', '1')
    .set('۲', '2')
    .set('۳', '3')
    .set('۴', '4')
    .set('۵', '5')
    .set('۶', '6')
    .set('۷', '7')
    .set('۸', '8')
    .set('۹', '9');
  return numberMap.get(char);
}
