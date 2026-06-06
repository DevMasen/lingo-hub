const API_URL = import.meta.env.VITE_API_URL;
export async function getOTP() {
  try {
    const res = await fetch(`${API_URL}/otp`);
    if (!res.ok) throw new Error('Failed to fetch OTP!');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}
