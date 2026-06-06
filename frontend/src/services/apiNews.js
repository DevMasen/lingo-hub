const API_URL = 'http://localhost:8000';
export async function getNews() {
  try {
    const res = await fetch(`${API_URL}/news`);
    if (!res.ok) throw Error('Fetch Error: code88');
    const data = await res.json();
    return data;
  } catch {
    throw Error('Failed getting news');
  }
}
