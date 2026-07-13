export function getErrorMessage(err) {
  if (!err) return null;
  return err.message ?? ((typeof err === 'string' ? err : JSON.stringify(err)) || 'خطایی رخ داد');
}
