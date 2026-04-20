//* verification function on input
export default function makeNumericInput(inputString = '') {
  const invalidRegex = /[^۰-۹]/g;
  const val = inputString.replace(invalidRegex, '');
  return val;
}
