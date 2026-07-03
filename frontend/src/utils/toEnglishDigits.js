export default function toEnglishDigits(input = '') {
  const persianDigits = '۰۱۲۳۴۵۶۷۸۹';
  const arabicDigits = '٠١٢٣٤٥٦٧٨٩';

  return input.replace(/[۰-۹٠-٩]/g, (char) => {
    const persianIndex = persianDigits.indexOf(char);
    if (persianIndex !== -1) return String(persianIndex);

    return String(arabicDigits.indexOf(char));
  });
}
