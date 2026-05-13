const API_URL = 'http://localhost:8000';
export async function getOTP() {
  try {
    const res = await fetch(`${API_URL}/otp`);
    if (!res.ok) throw Error();
    const data = await res.json();
    return data;
  } catch {
    throw Error('Failed getting otp');
  }
}
