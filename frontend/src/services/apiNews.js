const API_URL = import.meta.env.VITE_API_URL;
export async function getNews() {
  try {
    const res = await fetch(`${API_URL}/news`);
    if (!res.ok) throw new Error('Failed to fetch news!');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err.message);
  }
}
