//* verification function on input
export default function makeNumericInput(inputString = '') {
  const invalidRegex = /[^0-9]/g;
  const val = inputString.replace(invalidRegex, '');
  return val;
}
