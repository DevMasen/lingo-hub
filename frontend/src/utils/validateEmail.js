export default function validateEmail(inputString = '') {
  const emailValidRegex = /([a-zA-Z0-9_.])@[a-zA-Z]+\.[a-z]/g;
  const isValid = emailValidRegex.test(inputString);
  return isValid;
}
