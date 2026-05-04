export default function mapToPersianMonth(month = '') {
  const monthMap = new Map()
    .set('۰۱', 'فروردین')
    .set('۰۲', 'اردیبهشت')
    .set('۰۳', 'خرداد')
    .set('۰۴', 'تیر')
    .set('۰۵', 'مرداد')
    .set('۰۶', 'شهریور')
    .set('۰۷', 'مهر')
    .set('۰۸', 'آبان')
    .set('۰۹', 'آذر')
    .set('۱۰', 'دی')
    .set('۱۱', 'بهمن')
    .set('۱۲', 'اسفند');
  return monthMap.get(month);
}
