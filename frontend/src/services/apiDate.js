const API_URL = import.meta.env.VITE_API_URL;
export async function getDate() {
  try {
    const res = await fetch(`${API_URL}/date`);
    if (!res.ok) throw new Error('Failed to fetch date!');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}
