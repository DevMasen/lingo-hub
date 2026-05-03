const API_URL = 'http://localhost:8000';

export async function hash(id) {
  try {
    const res = await fetch(`${API_URL}/hash/${id}`);
    if (!res.ok) throw Error('Fetch Error: code07');
    const data = await res.json();
    return data;
  } catch {
    throw Error('Failed Hash Data');
  }
}
